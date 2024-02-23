import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject(){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        selectedProject: null
      }
    })
  }

  function handleSelectProject(id){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProject: id,
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
    setProjectState((prevState)=>{
      const projectId = Math.random(); 
      const newProject = {
        ...projectData,
        id: projectId
      };
      return{
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject(){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter((proj)=>
          proj.id!==prevState.selectedProject
        ),
      };
    });
  }

  function handleAddTask(text){
    setProjectState((prevState)=>{
      const taskId = Math.random(); 
      const newTask = {
        text: text,
        projectId: prevState.selectedProject,
        id: taskId,
      };
      return{
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        tasks: prevState.tasks.filter((task)=>
          task.id!==id
        ),
      };
    });
  }

  const selectedProject = projectState.projects.find((project)=>project.id===projectState.selectedProject)
  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks}/> ;

  if(projectState.selectedProject===null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }
  else if(projectState.selectedProject===undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (          
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onStartAddProject={handleStartAddProject} project={projectState.projects} onSelectProject={handleSelectProject} selectedProject={projectState.selectedProject} />
      {content}
    </main>
  );
}

export default App;
