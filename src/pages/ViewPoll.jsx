import { IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonProgressBar, IonRow, IonTitle, IonToast, IonToolbar, useIonViewWillEnter, useIonPopover } from '@ionic/react';
import { arrowRedoOutline, colorWandOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useParams } from 'react-router';
import { PollStore } from '../store';
import { addVote } from '../store/PollStore';
import { getPoll } from '../store/Selectors';
import styles from "./ViewPoll.module.scss";
import { getColors } from '../helpers/utils';
import { SharePopover } from '../components/Share';
import { useRef } from 'react';

const ViewPoll = () => {

	const params = useParams();
	const poll = PollStore.useState(getPoll(params.id));

	const answerRefs = useRef([]);
	const [ colors, setColors ] = useState({});
	const [ showToast, setShowToast ] = useState(false);
	const [ showVotes, setShowVotes ] = useState(false);

	const [ present, dismiss ] = useIonPopover(SharePopover, { onHide: () => dismiss(), poll, setShowToast });

	useIonViewWillEnter(() => {

		const cardStyleColors = getColors(poll.color);
		setColors(cardStyleColors);
	});

	const vote = answerId => {

		if (!poll.voted) {
			
			poll.answers.forEach((answer, index) => {

				const pollAnswer = answerRefs.current[index];
				pollAnswer.classList.add("animate__fadeOut");
			});

			setTimeout(() => addVote(params.id, answerId), 550);
		}
	}

	const getAnswerPercentage = (totalVotes, answerVotes) => {

		const percent = Math.round((answerVotes / totalVotes) * 100);
		return percent;
	}

	return (
    	<IonPage>
      		<IonHeader>
        		<IonToolbar>
          			<IonButtons slot="start">
            			<IonBackButton text="Ionic Polls" style={{ color: poll.color }} />
          			</IonButtons>
          			<IonTitle>Ionic Poll</IonTitle>
				</IonToolbar>
      		</IonHeader>

      		<IonContent fullscreen>
        		<IonHeader collapse="condense">
          			<IonToolbar>
            			<IonTitle size="large">Ionic Poll</IonTitle>
          			</IonToolbar>
        		</IonHeader>

				<IonCard className={ `${ styles.pollQuestion } animate__animated animate__fadeIn` }>
					<IonCardHeader style={{ backgroundColor: colors.backgroundColor }}>
						<IonCardTitle style={{ color: colors.textColor }}>{ poll.question }</IonCardTitle>
						<IonCardSubtitle className="ion-margin-bottom" style={{ color: colors.subTextColor }}>{ poll.timeLeft } left</IonCardSubtitle>
						<p style={{ color: colors.textColor, margin: "0" }}>{ poll.totalVotes } votes already</p>
						
					</IonCardHeader>
				</IonCard>

				<div className="animate__animated animate__fadeIn">
					{ poll.answers.map((answer, index) => {

						const answerPercentage = getAnswerPercentage(poll.totalVotes, answer.votes);

						return (
							<IonRow key={ `answer_${ answer.id }` } className={ `ion-align-items-center ion-justify-content-center ${ styles.pollAnswer }` }>
								<IonCol size="11">
									{ !poll.voted &&
										<IonButton className="animate__animated" ref={ ref => answerRefs.current[index] = ref } expand="block" fill={ answer.voted ? "solid" : "outline" } style={ answer.voted ? colors.votedButtonStyle : colors.notVotedbuttonStyle } onClick={ () => vote(answer.id) }>
											{ answer.answer }
											{ poll.voted && ` (${ answerPercentage }%)` }
										</IonButton>
									}

									{ (poll.voted) &&
										<div id={ `answerVoted_${ answer.id }` }>	
											<p style={{ color: poll.color }}>{ answer.answer } ({ answerPercentage })%</p>
											{ showVotes && <p style={{ color: poll.color }}>{ answer.votes } of { poll.totalVotes } total votes</p> }
											<IonProgressBar value={ answerPercentage / 100 } style={ colors.percentTrack } />
										</div>
									}
								</IonCol>
							</IonRow>
						);
					})}
				</div>

				<IonToast duration="2000" header="Poll" message="Copied to clipboard" onDidDismiss={ () => setShowToast(false) } isOpen={ showToast } color="dark" position="bottom" />
      		</IonContent>

			<IonFooter className="ion-padding-bottom">
				<IonRow className="ion-padding-start ion-padding-end ion-padding-bottom ion-padding-top">
					<IonCol size="6">
						<IonButton expand="block" style={ colors.votedButtonStyle } onClick={ (e) => present({ event: e.nativeEvent }) }>
							<IonIcon icon={ arrowRedoOutline } />
							&nbsp; Share
						</IonButton>
					</IonCol>

					<IonCol size="6">
						<IonButton expand="block" fill="outline" style={ colors.notVotedbuttonStyle } onClick={ () => setShowVotes(!showVotes) } disabled={ !poll.voted }>
							<IonIcon icon={ colorWandOutline } />
							&nbsp; { showVotes ? "Hide" : "Show" } votes
						</IonButton>
					</IonCol>
				</IonRow>
			</IonFooter>
    	</IonPage>
	);
};

export default ViewPoll;