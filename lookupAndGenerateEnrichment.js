const transcription = require('./createTranscriptionFileWithGivenInputSegments');
const createuid = require('./createUUID');
const convertsHMS = require('./convertHMS');
const getdata = require('./vulnerabilitymetadata');
const deleteUtil = require('./deleteutil');
createTranscription(); // creating transcription.json file
let transcriptionJsonObj = require('./transcription.json');
searchForMatchingSegmentInTranscrriptionAndGenearteEnrichment();

function searchForMatchingSegmentInTranscrriptionAndGenearteEnrichment() {
    searchStr = getSearchTermsFromLookUpTable();
    for (i = 0; i < searchStr.length; i++) {
        searchAndGenerateERforMatchingSegment(searchStr[i]);
    }
}
function getSearchTermsFromLookUpTable() {
    const searchTermArr = [];
    searchTerm = getLookUpTable();
    console.log(searchTerm);
    for (const [key, value] of searchTerm.entries()) {
        searchTermArr.push(key);
    }
    return searchTermArr;
}
function getLookUpTable() {
    const categoryMap = new Map()
    categoryMap.set("care", "RESILIENCE EVENTS")
    categoryMap.set("well", "RESILIENCE TIMING")
    categoryMap.set("debt repayment", "RESILIENCE GAMES")
    categoryMap.set("split", "Life Events")
    categoryMap.set("debt", "RESILIENCE")
    categoryMap.set("critical illness", "HEALTH")
    categoryMap.set("death", "LIFE EVENTS")
    return categoryMap;
}

function getMappedCategoryFromLookUpTable(searchStr) {
    const map = getLookUpTable();
    var mappedCategory = map.get(searchStr);
    return mappedCategory;
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function smallFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function searchAndGenerateERforMatchingSegment(searchTerm) {
    for (var i = 0; i < transcriptionJsonObj.segments.length; i++) {
        var segmentJsonObj = transcriptionJsonObj.segments[i];
        for (var key in segmentJsonObj) {
            var segmentObjectkeys = [];
            segmentObjectkeys.push(key);
            //Look for the presence of attribute text in every segment object of transcription.json file
            if ((segmentObjectkeys == 'text')) {
                let text = segmentJsonObj.text.valueOf();
                convertupper = text.toUpperCase();
                segmentId = segmentJsonObj.segment_id.valueOf();
                var uppercasestring = searchTerm.toUpperCase();
                let start_char = convertupper.indexOf(uppercasestring);
                let last_char = start_char + uppercasestring.length;

                //performing case insensitive search
                if (text.includes(smallFirstLetter(searchTerm)) || text.includes(capitalizeFirstLetter(searchTerm))) {
                    //If the search term found then create enrichment.json file
                    console.log("The search term " + searchTerm + " " + "is  found in this segment having segment ID " + segmentId);
                    var fs = require('fs');
                    var path = require("path");
                    const dirname = path.join(__dirname, "Enrichment");
                    const filename = `enrichments_${(new Date().toJSON().slice(0, 10))}.json`;
                    try {
                        fs.mkdirSync(dirname);
                    }
                    catch (err) {
                        if (err.code == 'EEXIST') {
                            console.log("This directory " + dirname + " already exists");
                        }
                        else {
                            console.log(err);
                        }
                    }

                    enrichmentmetadata.enrichments = [];

                    //code for create the enrichment file
                    (async () => {
                        var objs = {
                            enrichment_id: create_UUID(),
                            segment_id: segmentId,
                            category: getMappedCategoryFromLookUpTable(searchTerm),
                            start_character: start_char,
                            end_character: last_char,
                            timestamp: convertHMS(segmentJsonObj.time.valueOf()),
                        };
                        //writing the metadata for Enrichment file
                        await fs.writeFile(path.join(dirname, filename), JSON.stringify(enrichmentmetadata), function (err) {
                            if (err)
                                throw err;
                            console.log('Completed writing of Enrichments metadata to the file');
                        }
                        );

                        enrichmentmetadata.enrichments.push(objs);
                        //It is writing matching section to the Enrichment file
                        fs.writeFile(path.join(dirname, filename), JSON.stringify(enrichmentmetadata), function (err) {
                            if (err)
                                throw err;
                            console.log(filename + ' file has been  created');
                        }
                        );
                    })();

                    // deleting all file older than today
                    deleteOlderFileIfExist(dirname);
                }
                else {
                    console.log("The search term " + searchTerm + " " + "is not present in this segment having segment ID " + segmentId);
                }
            }

        }
    }

}


