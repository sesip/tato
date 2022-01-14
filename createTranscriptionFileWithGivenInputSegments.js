const createuid = require('./createUUID');

createTranscription =  function () {
    var fs = require('fs'); 
    const transfilename = "transcription.json";

    transcription = {
        audioDurationSeconds: 723.74,
        segments: [
            {
                segment_id: create_UUID(),
                "chanel": "Agent",
                "time": 30.88,
                "text": "And would you like all them repayment mortgages to split between repayment and interest the repayment?",
                "confidence": 0.77
            },
            {
                segment_id: create_UUID(),
                "chanel": "Customer",
                "time": 32.84,
                "text": "I want to repay the debt repayment",
                "confidence": 0.78
            },
            {
                segment_id: create_UUID(),
                "chanel": "Agent",
                "time": 35.88,
                "text": "What you got is that existing life for critical illness covers?",
                "confidence": 0.79
            },
            {
                segment_id: create_UUID(),
                "chanel": "Agent",
                "time": 37.88,
                "text": "If your death, the property would have to be sold just to make you aware of that.",
                "confidence": 0.79
            }       
        ]
    }
   fs.writeFileSync(transfilename, JSON.stringify(transcription), function (err) {
        if (err) throw err;
        console.log('complete');
      }
      );
}

