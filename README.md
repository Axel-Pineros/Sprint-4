<h1>REST API</h1>

<h2>Set up</h2>

In order to test this API, Postman is required. I strongly suggest to download the VS Code extension <a href="https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode">Postman</a>. Once done, click in the Postman eye icon in the left and sign in with your Postman account.

Don't forget to run <code>npm i</code>!

<h2>First steps</h2>

To start the server, type <code>ts-node index.ts</code> in the terminal. The terminal will inform that in order to exit the server you need to press <code>Ctrl + C</code> and that the server is running on http://localhost:8000. Go to Postman and select "New HTTP request".

<h2>Testing the REST API</h2>

For the 4 operations we want to test:

-Add a task: Select POST as method and http://localhost:8000/tasks as url. Tasks will be "completed: false" by default. To add a description, click "Body", select "raw" and then "JSON". Type

<code>{
    "description": "Task content here"
}</code>

Click Send.

-Update a task: Select PUT as method and http://localhost:8000/tasks/taskid as url. To change state, click "Body", select "raw" and then "JSON". Type

<code>{
    "completed": true
}</code>

Click Send.

-List all the tasks: Select GET as method and http://localhost:8000/tasks as url. Click Send.

-Delete a task: Select DELETE as method and http://localhost:8000/tasks/taskid as url. Click send.