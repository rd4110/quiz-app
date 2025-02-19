import React from 'react';
import { Button, ListGroupItem} from 'reactstrap';
import deleteImg from '../images/close.png';


function ListCards(props) {
    return(
        
        <div className='row mb-3 mr-5 ml-4 d-flex justify-content-center'>
            <div className='col-md-8 mx-md-n5'>
            <ListGroupItem className='deck-border list-card mx-n5'>
                <div className='row'>
                    <div className='col-md-8 pt-3'>
                        <h3>{props.keyword}</h3>
                        <p>{props.def}</p>
                    </div>
                    <div className='col-md-4'>
                        <div className='col-12 d-flex justify-content-end align-items-md-start align-items-end'>
                            <Button className='deleteBtnStyle bg-transparent' onClick={() => props.removeCard(props.id)}><img className='delete-btn' src={deleteImg} alt='delete button'/></Button>
                        </div>
                    </div>
                </div>
            </ListGroupItem>
            </div>
        </div>
				
    );
}

export default ListCards;