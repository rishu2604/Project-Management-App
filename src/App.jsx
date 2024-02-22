import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartAddProject(){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleSelectProject(id){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function handleCancelAddProject(){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProjectId: undefined
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
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    })
  }

  const selectedProject = projectState.projects.find(project=>project.id===projectState.selectedProjectId)
  let content = <SelectedProject project={selectedProject}/> ;

  if(projectState.selectedProjectId===null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }
  else if(projectState.selectedProjectId===undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (          
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onStartAddProject={handleStartAddProject} project={projectState.projects} onSelectProject={handleSelectProject} />
      {content}
    </main>
  );
}

export default App;
