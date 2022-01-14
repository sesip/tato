                                                  Description about required IDE and installment

1>Save the project in some directory.
2>install Visual studio code and nodejs on youe system.
3>open the project in visual studio code and  also create your own project 
how to open folder in visual studio code?
  ->open the visual studio code ->click on file ->click open folder ->choose the folder and click open.
how to run code?
->click the terminal and type-> node file name 

                                    PLEASE READ THIS
->Code is written in lookupAndGenerateEnrichment.js file. To run this code click on terminal and type (node filename)->node lookupAndGenerateEnrichment.js 
->first it will create transcription.json file, the template code for  which is written in createTranscriptionFileWithGivenInputSegments.js and called in lookupAndGenerateEnrichment.js.
->if search found it will create directory Enrichment and file with the name enrichment_{date}.json file  .
->If search not found then enrichment_{date}.json file will be modified
->It deletes all file older than today.



how to write the test cases in cypress?
->first generate package.json file so node will read this file  and according download required software in same project
run is command to generate package.json->npm init
 install cypress in your project ->npm install cypress --save-dev ->run this command

 to open cypress please run this command ->node_modules\.bin\cypress open 
 Note->first time it will take some time to open 

please take help of this video for installing cypress https://youtu.be/F53rDUwiAbU



