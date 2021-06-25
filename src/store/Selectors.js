import { createSelector } from 'reselect';

const getState = state => state;

//  General getters
export const getPolls = createSelector(getState, state => state.polls);

//  More specific getters
export const getPoll = pollId => createSelector(getState, state => state.polls.filter(poll => poll.id === parseInt(pollId))[0]);
// export const getChat = contactId => createSelector(getState, state => state.chats.filter(c => parseInt(c.contact_id) === parseInt(contactId))[0].chats);
// export const getContact = contactId => createSelector(getState, state => state.contacts.filter(c => parseInt(c.id) === parseInt(contactId))[0]);

// export const getChatNotificationCount = contactId => createSelector(getState, state => (state.chats.filter(c => parseInt(c.contact_id) === parseInt(contactId))[0].chats).filter(chat => chat.read === false));
