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

  function handleCancelAddProject(){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProject: undefined
      }
    })
  }

  function handleAddProject(projectData){
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId
    };
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject]
      };
    })
  }

  let content;

  if(projectState.selectedProject===null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }
  else if(projectState.selectedProject===undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (          
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onStartAddProject={handleStartAddProject} project={projectState.projects}/>
      {content}
    </main>
  );
}

export default App;
