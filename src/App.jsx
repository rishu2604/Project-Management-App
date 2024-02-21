import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProject: undefined,
    projects: []
  });

  function handleStartAddProject(){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProject: null
      }
    })
  }

  let content;

  if(projectState.selectedProject===null){
    content = <NewProject />
  }
  else if(projectState.selectedProject===undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (          
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onStartAddProject={handleStartAddProject}/>
      {content}
    </main>
  );
}

export default App;
