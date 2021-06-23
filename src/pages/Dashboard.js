import {useState, useEffect} from 'react';
import instance from '../api/apiConfig';
import TeamChart from './TeamChart';
import TeamCards from '../components/TeamCard';


const DashboardPage = () => {
  const [teams, setTeams] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

   const getTeams = async () => {
       try{
           let {data} = await instance.get('/teams')
           let items = data.data;
           setTeams(items);
          }
      catch (e){
              console.log(e);
          }
   }
 
   useEffect(() => {
    getTeams();
  }, [searchTerm]);
  
    const foundTeam = teams.filter(tm => {
     
      return (
          tm.name.toLowerCase().includes(searchTerm.toLowerCase())) 
          
  }
  )
  const findTeam = () => {
    if(searchTerm){
      let getTeam = foundTeam[0].name;
      return(
       <TeamChart getTeam={getTeam} />
       
     )}
  }
    const handleChange = (event) => {
       setSearchTerm(event.target.value);
       
      }

  return (
    
      <div id='home-page'>
         <div className='row text-center mt-3'>
            <div className='col'>
                <h1>NBA Teams</h1>
            </div>
          </div>
        {/**Search filter */}
                <div className='row mt-5'>
                <div className='col'>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      id='hero-search'
                      placeholder='Search for teams'
                      value={searchTerm}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
    {/** team list */}
    <div className='row mt-3'>
    <div className='row '>
       {foundTeam.map((team,index) => {
            return (
                <div className='five-columns' key={index}> 
                    <TeamCards team={team}/>
                </div>
                )
        })}
      </div>
    </div>
    <div className='row'>
      {findTeam()}
     </div>
    </div>
      

  )

  
}

export default DashboardPage;
