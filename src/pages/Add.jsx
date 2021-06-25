import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, useIonRouter, useIonViewDidEnter } from '@ionic/react';
import { useState } from 'react';

import { GithubPicker } from 'react-color';
import { getColors } from '../helpers/utils';
import { addOutline } from 'ionicons/icons';
import { PollDuration } from '../components/PollDuration';
import { PollAnswer } from '../components/PollAnswer';
import { addPoll } from '../store/PollStore';

const Add = () => {

	const router = useIonRouter();
	const [ showPicker, setShowPicker ] = useState(false);
	const [ pollQuestion, setPollQuestion ] = useState("");
	const [ pollColor, setPollColor ] = useState("#427ed8");
	const [ pollAnswers, setPollAnswers ] = useState([]);
	
	const [ pollDays, setPollDays ] = useState(0);
	const [ pollHours, setPollHours ] = useState(0);
	const [ pollMins, setPollMins ] = useState(0);

	const pickerColors = [
		
		"#759dc7",
		"#68bd8d",
		"#bd7368",
		"#8d68bd",
		"#bd68ac",
		"#6868bd",
		"#68a8bd",
		"#68bda5",
		"#bd9868",
		"#d84848",
		"#d87c48",
		"#d8bb48",
		"#7c7c7c"
	];

	const colors = pollColor && getColors(pollColor);

	useIonViewDidEnter(() => {

		setShowPicker(false);
		setPollQuestion("");
		setPollColor("#427ed8");
		setPollAnswers([]);

		setPollDays(0);
		setPollHours(0);
		setPollMins(0);
	});

	const handleAdd = async () => {

		const timeLeftDays = pollDays !== 0 && pollDays !== "" ? `${ pollDays } days, ` : "";
		const timeLeftHours = pollHours !== 0 && pollHours !== "" ? `${ pollHours } hours, ` : "";
		const timeLeftMins = pollMins !== 0 && pollMins !== "" ? `${ pollMins } mins` : "";

		const timeLeft = `${ timeLeftDays }${ timeLeftHours }${ timeLeftMins }`;

		const poll = {

			id: Date.now(),
			question: pollQuestion,
			color: pollColor,
			timeLeft,
			answers: pollAnswers,
			totalVotes: 0,
			voted: false
		};

		addPoll(poll);
		router.push("/page/view");
	}

	const addAnswer = () => {

		const answer = {

			id: Date.now(),
			answer: "",
			votes: 0,
			voted: false,
			percent: 0
		};

		setPollAnswers(prev => [...prev, answer ] );
	}

	const removeAnswer = answer => {

		const newAnswers = pollAnswers.filter((p) => p !== answer);
  		setPollAnswers(newAnswers);
	}

	const handleChange = (e, index) => {

		const newAnswers = [ ...pollAnswers ];
		newAnswers[index].answer = e.target.value;
		setPollAnswers(newAnswers);
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
					<IonBackButton text="Ionic Polls" style={{ color: pollColor ? pollColor : "" }} />
					</IonButtons>
					<IonTitle>Add Poll</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Add Poll</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonGrid className="animate__animated animate__fadeIn">
					<IonRow>
						<IonCol size="12">
							<IonButton expand="block" onClick={ () => setShowPicker(!showPicker) } size="large" fill="solid" style={ colors.votedButtonStyle }>Poll Color</IonButton>
							{ showPicker && <GithubPicker colors={ pickerColors } color={ pollColor } onChange={ color => setPollColor(color.hex) } onChangeComplete={ () => setShowPicker(false) } /> }
						</IonCol>
						<IonCol size="12">
							<IonItem lines="full">
								<IonLabel position="floating">Poll Question</IonLabel>
								<IonTextarea rows="2" value={ pollQuestion } onIonChange={ e => setPollQuestion(e.target.value) } placeholder="A question to ask..." />
							</IonItem>
						</IonCol>
					</IonRow>

					<IonRow className="ion-margin-top">
						<IonCol size="12" className="ion-padding-start">
							<IonCardTitle>Poll Duration</IonCardTitle>
						</IonCol>

						<IonCol size="12">
							<IonRow className="ion-justify-content-center ion-align-items-center ion-text-center">
								<PollDuration label="Days" value={ pollDays } setter={ setPollDays } />
								<PollDuration label="Hours" value={ pollHours } setter={ setPollHours } />
								<PollDuration label="Mins" value={ pollMins } setter={ setPollMins } />
							</IonRow>
						</IonCol>
					</IonRow>

					<IonRow className="ion-margin-top ion-align-items-center">
						<IonCol size="10" className="ion-padding-start">
							<IonCardTitle className="ion-justify-content-between">
								Poll Answers
							</IonCardTitle>
						</IonCol>
							
						<IonCol size="2">
							<IonButton onClick={ addAnswer } disabled={ !pollAnswers.length > 0 }>
								<IonIcon icon={ addOutline } />
							</IonButton>
						</IonCol>
					</IonRow>

					{ pollAnswers.length > 0 && pollAnswers.map((answer, index) => {

						return <PollAnswer key={ `pollAnswer_${ index }` } index={ index } value={ answer } remove={ removeAnswer } change={ handleChange } />;
					})}

					<IonRow>
						{ !pollAnswers.length &&
							
							<IonCol size="12">
								<IonItem lines="full" className="ion-justify-content-center ion-align-items-center">
									<IonLabel className="ion-text-center">
										<p>There are currenty no answers added for this poll.</p>
										<IonButton color="success" onClick={ addAnswer }>Add one now</IonButton>
									</IonLabel>
								</IonItem>
							</IonCol>
						}
					</IonRow>
				</IonGrid>
			</IonContent>

			<IonFooter className="ion-padding-bottom">
				<IonRow className="ion-padding-start ion-padding-end ion-padding-bottom ion-padding-top">
					<IonCol size="12">
						<IonButton fill="outline" expand="block" onClick={ handleAdd }>
							Save
						</IonButton>
					</IonCol>
				</IonRow>
			</IonFooter>
		</IonPage>
	);
};

export default Add;
