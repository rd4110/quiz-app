import React from 'react';
import ReactCardFlip from 'react-card-flip';

function CardFlips(props) {

    

    return(

        <div className='mt-3'>
            <ReactCardFlip isFlipped={props.isFlipped} flipDirection='vertical' infinite>
                <div className='card flipCards w-100 text-center'>
                    <div className='card-body'>
                        <h5 className='card-title'>Keyword</h5>
                        <p className='card-text'>{props.keyword}</p>
                        <button onClick={props.handleFlip} className='btn btn-primary'>View definition</button>
                    </div>
                </div>
        
                <div className='card flipCards w-100 text-center'>
                    <div className='card-body'>
                        <h5 className='card-title'>Definition</h5>
                        <p className='card-text'>{props.definition}</p>
                        <button onClick={props.handleFlip} className='btn btn-primary'>View keyword</button>
                    </div>
                </div>
            </ReactCardFlip>
        </div>
		
    )
}

export default CardFlips;
