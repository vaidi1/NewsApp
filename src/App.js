
import './App.css';

import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Main,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {

//export default class App extends Component {
  const pageSize = 5;
  const [progress, setProgress] = useState(0)
  // pageSize = 5;
  // state = {
  //   progress: 0
  // }
  // setProgress = (progress)=>{
  //   setState({progress: progress})
  // }
  //render() {
    return (
      <div>
        <Main>
        <NavBar/>
        <LoadingBar
        color='#0d6efd'
        progress={progress}
        />
        <Routes>
          <Route exact path='/' element={<News setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" />}/>
          <Route exact path='/business' element={<News setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business" />}/>
          <Route exact path='/entertainment' element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />}/>
          <Route exact path='/general' element={<News setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" />}/>
          <Route exact path='/health' element={<News setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health" />}/>
          <Route exact path='/science' element={<News setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science" />}/>
          <Route exact path='/sports' element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports" />}/>
          <Route exact path='/technology' element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology" />}/>
        </Routes>
        </Main>
      </div>
    )
  //}
//}
}

export default App;
