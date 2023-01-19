<h1>Graphql chart project with visx</h1>
<h2>To start this project clone the repo and the go to the folder start terminal and run npm install, after install is finish run npm start</h2>
<p>The process of building the charts app with React, Apollo Client and visx involved several steps. First, I used the Apollo client to retrieve data from a GraphQL endpoint and then used the useQuery hook to handle the data. We then used the useMemo and useCallback hooks to optimize the application's performance by only re-rendering the necessary components when the data changes.</p>

<p>In terms of data visualization, I used the visx library to create a bar chart showing the number of posts grouped by month. We defined the scales and composed them with the accessory data functions to obtain the point functions.</p>

<p>One of the main challenges I faced was making sure the chart was responsive to different screen sizes. To solve this, we added a window resize event listener that updates the width of the chart every time the screen size changes. It also took me a while to integrate @visx and see how it works since this is my first time using it.</p>