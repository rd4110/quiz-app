import React, { useEffect, useState } from 'react';
import API from '../../utils/Api';
import { Button } from 'reactstrap';
import CardFlips from '../CardFlips';
import { Link } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';

const Review = (props) => {
	const [cards, setCards] = useState([]);
	const [currentCard, setCurrentCard] = useState({});
	const deckID = props.location.state.deckID;
	const deckName = props.location.state.name;
	const [nextDisabled, setNextDisabled] = useState(false);
	const [previousDisabled, setPreviousDisabled] = useState(true);
	const [count, setCount] = useState(0);
	const [check, setCheck] = useState(false);
	const [isFlipped, setIsFlipped] = useState(false);
	const history = useHistory();

	const handleFlip = (e) => {
		e.preventDefault();
		setIsFlipped(!isFlipped);
	};

	const findCards = (deckID) => {
		API.getCard(deckID)
			.then((res) => {
				setCards(res.data);
				setCurrentCard(res.data[0]);
			})
			.catch((err) => {
				console.log(err);
				setCheck(!check);
			});
	};

	const nextItem = () => {
		setIsFlipped(false);
		setCount(count + 1);
		setCardOnPage(count + 1);
	};

	const previousItem = () => {
		setIsFlipped(false);
		setCount(count - 1);
		setCardOnPage(count - 1);
	};

	const setCardOnPage = (num) => {
		if (num < 1) {
			setPreviousDisabled(true);
			setCurrentCard(cards[num]);
		} else if (num > 0) {
			setPreviousDisabled(false);
			setCurrentCard(cards[num]);
		} else if (num > cards.length) {
			setNextDisabled(true);
			setPreviousDisabled(true);
		}
	};

	// go to a deck's card page
	const cardsPage = (deckID, deckName) => {
		history.push({
			pathname: '/cards',
			state: { deckID: deckID, name: deckName },
		});
	};

	useEffect(() => {
		findCards(deckID);
	}, [check]);

	return (
		<div className='page text-center'>
			<h1 className='text-center mt-5'>Review - {deckName}</h1>
			<a onClick={() => cardsPage(deckID, deckName)} className='text-center'>
				<span className='link'>Edit this deck</span>
			</a>

			<div className='container mt-5'>
				<div className='row'>
					{currentCard ? (
						<div className='col-md-3 col-sm-12 d-flex justify-content-center align-items-start'>
							{previousDisabled === true ? (
								<Button onClick={() => previousItem()} disabled>
									Previous Card
								</Button>
							) : (
								<Button onClick={() => previousItem()}>Previous Card</Button>
							)}
						</div>
					) : (
						<div></div>
					)}
					<SwitchTransition>
						<CSSTransition
							key={count}
							addEndListener={(node, done) =>
								node.addEventListener('transitionend', done, false)
							}
							classNames='fade'
						>
							{currentCard ? (
								<div className='col-md-6 col-sm-12'>
									<CardFlips
										keyword={currentCard.keyWord}
										definition={currentCard.definition}
										isFlipped={isFlipped}
										handleFlip={handleFlip}
									/>
								</div>
							) : (
								<div className='col-12 text-center'>
									<h4>Great job, you have finished your review!</h4>
									<Link to='/'>
										<Button>Back to my Decks</Button>
									</Link>
									<Button onClick={() => window.location.reload(false)}>
										Review Again!
									</Button>
								</div>
							)}
						</CSSTransition>
					</SwitchTransition>

					{currentCard ? (
						<div className='col-md-3 col-sm-12 d-flex justify-content-center align-items-start'>
							{nextDisabled === true ? (
								<Button onClick={() => nextItem()} disabled>
									Next Card
								</Button>
							) : (
								<Button onClick={() => nextItem()}>Next Card</Button>
							)}
						</div>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Review;
