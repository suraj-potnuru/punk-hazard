import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Duration } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

export class PunkHazardStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const serviceName = 'PunkHazardService'

        const punkHazardPostsTable = new Table(this, `${serviceName}PostsTable`, {
            partitionKey: { name: 'id', type: AttributeType.STRING },
            billingMode: BillingMode.PAY_PER_REQUEST
        });

        const punkHazardServiceLambdaRole = new Role(this, `${serviceName}LambdaRole`, {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });
        punkHazardServiceLambdaRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        punkHazardServiceLambdaRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));

        const environmentVariables = {
            POSTS_TABLE: punkHazardPostsTable.tableArn
        }

        const punkHazardServiceLambda = new Function(this, `${serviceName}Lambda`, {
            runtime: Runtime.PYTHON_3_9,
            handler: 'app.request_handler',
            code: Code.fromAsset("src/lambda/punk_hazard_service_lambda"),
            role: punkHazardServiceLambdaRole,
            environment: environmentVariables,
            timeout: Duration.seconds(900),
            memorySize: 512
        });

        const punkHazardServiceApi = new LambdaRestApi(this, `${serviceName}RestApi`, {
            handler: punkHazardServiceLambda,
            proxy: false
        });
        const posts = punkHazardServiceApi.root.addResource('posts');
        posts.addMethod('GET');

        const post = posts.addResource('{post}');
        post.addMethod('POST')
        post.addMethod('PUT');
        post.addMethod('DELETE');


    }
}
