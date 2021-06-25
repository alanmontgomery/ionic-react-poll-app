import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { getCardStyle } from '../helpers/utils';
import { PollStore } from '../store';
import { getPolls } from '../store/Selectors';
import styles from "./View.module.scss";

const View = () => {

	const polls = PollStore.useState(getPolls);

	return (
    	<IonPage>
      		<IonHeader>
        		<IonToolbar>
          			<IonButtons slot="start">
            			<IonMenuButton />
          			</IonButtons>
          			<IonTitle>Ionic Polls</IonTitle>
				</IonToolbar>
      		</IonHeader>

      		<IonContent fullscreen>
        		<IonHeader collapse="condense">
          			<IonToolbar>
            			<IonTitle size="large">Ionic Polls</IonTitle>
          			</IonToolbar>
        		</IonHeader>

				{ polls.map(poll => {

					const colors = getCardStyle(poll.color);

					return (

						<IonCard className={ `${ styles.pollQuestion } animate__animated animate__fadeIn` } style={{ backgroundColor: colors.backgroundColor }} routerLink={ `/page/view/${ poll.id }`} routerDirection="forward">

							<IonRow className="ion-align-items-center">
								<IonCol size="9">
									<IonCardHeader>
										<IonCardTitle style={{ color: colors.textColor }}>{ poll.question }</IonCardTitle>
										<IonCardSubtitle style={{ color: colors.subTextColor }}>{ poll.timeLeft } left</IonCardSubtitle>
										<p style={{ color: colors.textColor }}>{ poll.totalVotes } votes already</p>
										<p style={ colors.statusBadge }>{ poll.voted ? "You have voted on this poll" : "You haven't voted on this poll" }</p>
									</IonCardHeader>
								</IonCol>

								<IonCol size="3">
									<IonButton style={ colors.buttonStyle }>
										View
										<IonIcon icon={ arrowForwardOutline } />
									</IonButton>
								</IonCol>
							</IonRow>
						</IonCard>
					);
				})}
      		</IonContent>

			<IonFooter className="ion-padding-bottom">
				<IonRow className="ion-padding-start ion-padding-end ion-padding-bottom ion-padding-top">
					<IonCol size="12">
						<IonButton expand="block" routerLink="/page/add">
							Add new poll
						</IonButton>
					</IonCol>
				</IonRow>
			</IonFooter>
    	</IonPage>
	);
};

export default View;