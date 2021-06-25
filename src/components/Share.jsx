import { IonItem, IonList, IonListHeader } from "@ionic/react";
import { Share } from '@capacitor/share';
import { Clipboard } from '@capacitor/clipboard';

export const SharePopover = ({ onHide, poll, setShowToast }) => {

	const sharePoll = async () => {

		const shareLink = `https://ionic-react-poll-app.netlify.app/page/view/${ poll.id }`;
		const title = `Check out this poll - ${ poll.question } | ${ poll.totalVotes } votes already`;

		await Share.share({

			title: title,
			text: title,
			url: shareLink,
			dialogTitle: 'Share this poll',
		});
	}

	const copyLink = async () => {
		
		await Clipboard.write({
			
			string: `https://ionic-react-poll-app.netlify.app/page/view/${ poll.id }`
		});

		onHide();

		setShowToast(true);
	};

	return (
		<IonList>
			<IonListHeader>Share Poll</IonListHeader>
			<IonItem button onClick={ sharePoll }>Socials</IonItem>
			<IonItem button onClick={ copyLink }>Copy Link</IonItem>
			<IonItem lines="none" detail={false} button onClick={ onHide }>
				Close
			</IonItem>
		</IonList>
	);
}