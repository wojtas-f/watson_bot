# Bot application with Watson Assistant

You can test this app here [PenguinTechAssistant](https://penguin-chat-bot.herokuapp.com/)

The primary reason for creating this app was to test [Watson Assistant API](https://cloud.ibm.com/apidocs/assistant/assistant-v2?code=node#introduction).

If you need more information, you can check a [sample application](https://github.com/watson-developer-cloud/assistant-simple) that demonstrates the Watson Assistant service.

This app uses the Watson Assistant V2 API.

## Technology

- NodeJS / Express
- Watson Assistant
- Semantic UI
- hbs view engine
- webpack

## How to install

Before you start the application, you need to create an [IBM Cloud account](https://cloud.ibm.com/login), add Watson Assistant in Service section and acquire the ID, APIKEY, and URL.

Next, you should install all of the dependencies

```bash
npm install
```

Then create the 'config' folder with 'config.env' file and store the following variables:

```env
ASSISTANT_ID=
ASSISTANT_IAM_APIKEY=
ASSISTANT_URL=
```

Run the *build* command to create the chat.bundle.js file

```bash
npm run build
```

Finally, you can start the application:

```bash
npm run start
```
