import "./App.css";
// import HomePage from "./pages/homepage/homepage.component";
import { Route } from "react-router";

const HomePage = (props) => {
  console.log(props)
  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
};
const TopicsList = (props) => {
  console.log(props)
  return (
    <div>
      <h1>TopicsList</h1>
    </div>
  );
};
const TopicDetail = (props) => {
  console.log(props)
  return (
    <div>
     <h1>{props.match.params.topicId}</h1>
    </div>
  );
};

function App() {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/topics" component={TopicsList} />
      <Route exact path="/topics/:topicId" component={TopicDetail} />
    </div>
  );
}

export default App;
