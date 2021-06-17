import { SetLogoType } from '../services';

const TeamCards = ({team}) => {
   
    return (
        <div className= 'card mb-3'>
            <div className='card-header text-center' >
               <div className='th-card-bg-img' style={{backgroundImage:`url(${SetLogoType(team.name)})`}}></div>
            </div>
            <div className='card-body text-center'>
                <h3 className='card-title'>{team.name}</h3>
                <h5 className='card-title'>Division: {team.division}</h5>
                <h6 className='card-title mt-3 '>Conference: {team.conference}</h6>
               
                
            </div>
            <div className='card-footer  d-flex justify-content-between'>{team.city}</div>
            
        </div>
    )
}
export default TeamCards;
