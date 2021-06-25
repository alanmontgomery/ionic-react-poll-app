import { Store } from 'pullstate';

const PollStore = new Store({

	polls: [
		{
			id: 1,
			question: "What is your favourite movie?",
			timeLeft: "2 hours, 17 mins",
			totalVotes: 137,
			color: "#759dc7",
			voted: false,
			answers: [

				{
					id: 1,
					answer: "Avengers",
					votes: 76,
					voted: false,
					percent: 0
				},
				{
					id: 2,
					answer: "Taken 2",
					votes: 61,
					voted: false,
					percent: 0
				}
			]
		},
		{
			id: 2,
			question: "Do you prefer night or day?",
			timeLeft: "1 hours, 3 mins",
			totalVotes: 22,
			color: "#68bd8d",
			voted: false,
			answers: [

				{
					id: 1,
					answer: "Night",
					votes: 11,
					voted: false,
					percent: 0
				},
				{
					id: 2,
					answer: "Day",
					votes: 8,
					voted: false,
					percent: 0
				},
				{
					id: 3,
					answer: "In the middle",
					votes: 3,
					voted: false,
					percent: 0
				}
			]
		},
		{
			id: 3,
			question: "Who is the better singer?",
			timeLeft: "1 day, 2 hours, 43 mins",
			totalVotes: 268,
			color: "#8d68bd",
			voted: false,
			answers: [

				{
					id: 1,
					answer: "Abba",
					votes: 104,
					voted: false,
					percent: 0
				},
				{
					id: 2,
					answer: "Metallica",
					votes: 114,
					voted: false,
					percent: 0
				},
				{
					id: 3,
					answer: "Queen",
					votes: 50,
					voted: false,
					percent: 0
				}
			]
		},
		{
			id: 4,
			question: "Best type of food?",
			timeLeft: "4 days, 6 hours, 19 mins",
			totalVotes: 166,
			color: "#7c7c7c",
			voted: false,
			answers: [

				{
					id: 1,
					answer: "Hamburger",
					votes: 76,
					voted: false,
					percent: 0
				},
				{
					id: 2,
					answer: "Hotdog",
					votes: 61,
					voted: false,
					percent: 0
				},
				{
					id: 3,
					answer: "Chips",
					votes: 10,
					voted: false,
					percent: 0
				},
				{
					id: 4,
					answer: "Steak",
					votes: 19,
					voted: false,
					percent: 0
				}
			]
		},
	]
});

export default PollStore;

export const addVote = (pollId, answerId) => {

	PollStore.update(state => {
		
		const pollIndex = state.polls.findIndex(poll => poll.id === parseInt(pollId));
		const answerIndex = state.polls[pollIndex].answers.findIndex(answer => answer.id === parseInt(answerId));

		state.polls[pollIndex].voted = true;
		state.polls[pollIndex].totalVotes = state.polls[pollIndex].totalVotes + 1;
		state.polls[pollIndex].answers[answerIndex].votes = state.polls[pollIndex].answers[answerIndex].votes + 1;
		state.polls[pollIndex].answers[answerIndex].voted = true;
	});
}

export const addPoll = (poll) => {

	PollStore.update(state => {

		state.polls.unshift(poll);
	});
}