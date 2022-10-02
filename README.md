This is a CDK Application. To deploy this in to an AWS Account do - 

```bash
npm install
cdk bootstrap aws://ACCOUNT_ID/REGION
cdk synth
cdk deploy
```