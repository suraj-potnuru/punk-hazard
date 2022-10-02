import boto3


dynamodb_client = boto3.client('dynamodb')

def request_handler(event, context):
    print(event, context)
    return {}