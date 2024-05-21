import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';

type ExpectedProps = {
  tableName: string;
  userName: string;
} & cdk.StackProps;

export class ApplicationStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: ExpectedProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'dynamoTable', {
      tableName: props.tableName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'AppId', type: dynamodb.AttributeType.STRING },
    });

    table.addGlobalSecondaryIndex({
      indexName: 'AppKeyIndex',
      partitionKey: { name: 'AppKey', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL
    })

    const user = new iam.User(this, 'User', {
      userName: `${props.userName}`
    });

    table.grant(user, 'dynamodb:DescribeTable', 'dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:Scan')

    const accessKey = new iam.CfnAccessKey(this, 'accessKey', {
      userName: user.userName
    });

    new cdk.CfnOutput(this, 'accessToken', { value: accessKey.ref });
    new cdk.CfnOutput(this, 'secretAccessToken', {
      value: accessKey.attrSecretAccessKey
    });
  }
}
