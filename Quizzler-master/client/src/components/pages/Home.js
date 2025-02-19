import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
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
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useHistory, Link } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';
import cardImg from '../../images/flash-card.png';
import ListDecks from '../ListDecks';

const Home = () => {
	const { userData } = useContext(UserContext);
	const userID = userData.user;
	const [userDecks, setDecks] = useState([]);
	const history = useHistory();
	const [newTitle, setNewTitle] = useState('');
	const [newDescr, setNewDescr] = useState('');
	const newDeck = { name: newTitle, descr: newDescr };
	// const [check, setCheck] = useState(false);

	// save a new deck
	const saveDeck = (deck) => {
		API.createDeck({
			name: deck.name,
			descr: deck.descr,
		})
			.then(() => {
				findDecks();
				resetForm();
			})
			.catch((err) => console.log(err));
	};

	// reset form function
	const resetForm = () => {
		setNewTitle('');
		setNewDescr('');
	};

	// collect what's entered in title field set state
	const handleTitleChange = (event) => {
		const entered = event.target.value;
		setNewTitle(entered);
	};

	// collect what's entered in descr. field and set state
	const handleDescrChange = (event) => {
		const entered = event.target.value;
		setNewDescr(entered);
	};

	// find decks
	const findDecks = () => {
		API.getDeck()
			.then((res) => setDecks(res.data))
			.catch((err) => {
				console.log(err);
				// setCheck(!check);
			});
	};

	// delete a deck function
	const removeDeck = (deckID) => {
		API.deleteDeck(deckID)
			.then(() => findDecks())
			.catch((err) => console.log(err));
	};

	// go to a deck's card page
	const cards = (deck) => {
		history.push({
			pathname: '/cards',
			state: { deckID: deck._id, name: deck.name },
		});
	};
	// go to review page
	const review = (deck) => {
		history.push({
			pathname: '/review',
			state: { deckID: deck._id, name: deck.name },
		});
	};

	useEffect(() => {
		findDecks();
	}, []);

	return (
		<div className='page text-center'>
			{userData.user ? (
				<div>
					<h1>Welcome, {userData.user.displayName}!</h1>
					<h4 className='mt-4 mb-2'>Your Decks</h4>
					<ListGroup>
						<TransitionGroup className='deck-list'>
							<div className='mb-4 mt-3 d-flex justify-content-center'>
								<ListGroupItem className='deck-border'>
									<Form inline>
										<FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
											<Input
												value={newTitle}
												onChange={handleTitleChange}
												type='text'
												name='email'
												id='keyword'
												placeholder='Title'
											/>
										</FormGroup>
										<FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
											<Input
												value={newDescr}
												onChange={handleDescrChange}
												type='text'
												name='definition'
												id='definition'
												placeholder='Description'
											/>
										</FormGroup>
										<Button onClick={() => saveDeck(newDeck)}>Add New Deck</Button>
									</Form>
								</ListGroupItem>
							</div>
							{userDecks.map((deck) => (
								<CSSTransition key={deck.id} timeout={500} classNames='fade'>
									<ListDecks
										name={deck.name}
										descr={deck.descr}
										deck={deck}
										id={deck._id}
										cards={cards}
										review={review}
										removeDeck={removeDeck}
									/>
								</CSSTransition>
							))}
						</TransitionGroup>
					</ListGroup>
				</div>
			) : (
				<div className='container text-center mt-4'>
					<img className='card-img mb-4' src={cardImg} alt='flash card icon' />
					<h2>Welcome to</h2>
					<div className='row mt-4 d-flex justify-content-center'>
						<div className='col-md-6 col-sm-12'>
							<ReactCardFlip>
								<div className='card w-100 text-center flipCards'>
									<div className='card-body'>
										<h1 className='mt-5 mb-5'>Quizzler</h1>
									</div>
								</div>
								<div></div>
							</ReactCardFlip>
						</div>
					</div>
					<div className='row mt-3 d-flex justify-content-center'>
						<p>
							<Link className='links' to='/login'>
								Login
							</Link>{' '}
							or{' '}
							<Link className='links' to='/register'>
								Make An Account
							</Link>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
