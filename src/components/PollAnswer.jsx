import { IonButton, IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { trashOutline } from "ionicons/icons";

export const PollAnswer = ({ index, value, change, remove}) => (

	<IonRow className="ion-justify-content-center ion-align-items-center">
		<IonCol size="10">
			<IonItem lines="full">
				<IonLabel>
					<p>Option { index + 1 }</p>
					<IonInput type="text" inputmode="text" value={ value.answer } onIonChange={ e => change(e, index) } placeholder="Enter answer..." />
				</IonLabel>
			</IonItem>
		</IonCol>
		<IonCol size="2">
				<IonButton color="danger" fill="outline" onClick={ () => remove(value) }>
					<IonIcon icon={ trashOutline } />
				</IonButton>
		</IonCol>
	</IonRow>
);