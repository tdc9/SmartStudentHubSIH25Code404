const AWS = require('aws-sdk');
const S3 = new AWS.S3({ region: process.env.AWS_REGION });


async function uploadFile({ key, buffer, mime }){
const params = { Bucket: process.env.S3_BUCKET, Key: key, Body: buffer, ContentType: mime };
await S3.putObject(params).promise();
return `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}


module.exports = { uploadFile };