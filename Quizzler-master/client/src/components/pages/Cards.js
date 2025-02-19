import React, { useEffect, useState } from 'react';
import API from '../../utils/Api';
import {
	ListGroup,
	ListGroupItem,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListCards from '../ListCards';

const Card = (props) => {
	const [cards, setCards] = useState([]);
	const deckID = props.location.state.deckID;
	const deckName = props.location.state.name;
	const [newKeyWord, setNewKeyWord] = useState([]);
	const [newDefinition, setNewDefinition] = useState([]);
	const newCard = { keyWord: newKeyWord, definition: newDefinition };
	const [check, setCheck] = useState(false);
	const history = useHistory();

	const findCards = (deckID) => {
		API.getCard(deckID)
			.then((res) => {
				setCards(res.data);
				resetForm();
			})
			.catch((err) => {
				console.log(err);
				setCheck(!check);
			});
	};

	// reset from function
	const resetForm = () => {
		setNewKeyWord('');
		setNewDefinition('');
	};

	// delete a deck function
	const removeCard = (cardID) => {
		API.deleteCard(cardID)
			.then(() => findCards(deckID))
			.catch((err) => console.log(err));
	};

	const addCard = (deckID, cardData) => {
		API.createCard(deckID, {
			keyWord: cardData.keyWord,
			definition: cardData.definition,
		})
			.then(() => findCards(deckID))
			.catch((err) => console.log(err));
	};

	const handleKeyWordChange = (event) => {
		const entered = event.target.value;
		setNewKeyWord(entered);
	};

	const handleDefinitionChange = (event) => {
		const entered = event.target.value;
		setNewDefinition(entered);
	};

	// go to review page
	const review = (deckID, deckName) => {
		history.push({
			pathname: '/review',
			state: { deckID: deckID, name: deckName },
		});
	};

	// call find cards until it works
	useEffect(() => {
		findCards(deckID);
	}, [check]);

	return (
		<div className='text-center'>
			<h1>
				{deckName}: Cards{' '}
				<Button onClick={() => review(deckID, deckName)} className='text-center'>
					Review Now!
				</Button>
			</h1>
			<ListGroup>
				<TransitionGroup className='deck-list'>
					<div className='mb-4 mt-3 d-flex justify-content-center'>
						<ListGroupItem className='deck-border'>
							<Form inline>
								<FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
									{/* <Label for='Keyword' className='mr-sm-2'>
									Keyword
								</Label> */}
									<Input
										value={newKeyWord}
										onChange={handleKeyWordChange}
										type='input'
										name='input'
										id='keyword'
										placeholder='Keyword'
									/>
								</FormGroup>
								<FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
									{/* <Label for='examplePassword' className='mr-sm-2'>
									Definition
								</Label> */}
									<Input
										value={newDefinition}
										onChange={handleDefinitionChange}
										type='input'
										name='definition'
										id='definition'
										placeholder='Definition'
									/>
								</FormGroup>
								<Button onClick={() => addCard(deckID, newCard)}>Add New Card</Button>
							</Form>
						</ListGroupItem>
					</div>
					{cards.map((card) => (
						<CSSTransition key={card.id} timeout={500} classNames='fade'>
							<ListCards
								keyword={card.keyWord}
								def={card.definition}
								id={card._id}
								removeCard={removeCard}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</ListGroup>
		</div>
	);
};

export default Card;
