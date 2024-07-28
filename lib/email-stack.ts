import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
// import { Construct } from 'constructs'
import { ConfigProps } from './config'

type EmailLamdaStack = cdk.StackProps & {
  config: Readonly<ConfigProps>
}


export class EmailStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EmailLamdaStack) {
    super(scope, id, props)

    const {config} = props;

    const fn = new NodejsFunction(this, 'lambda', {
      entry: 'lambda/index.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_20_X,
      environment: {
        MAIL_FROM_EMAIL: config.MAIL_FROM_EMAIL,
        RESEND_API_TOKEN: config.RESEND_API_TOKEN,
      }
    })
    fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    })
    new apigw.LambdaRestApi(this, 'emailapi', {
      handler: fn,
    })
  }
}
