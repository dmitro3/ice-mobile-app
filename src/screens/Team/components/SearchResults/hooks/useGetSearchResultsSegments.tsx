// SPDX-License-Identifier: ice License 1.0

import {TeamUserType, User} from '@api/user/types';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {AGENDA} from '@screens/Team/constants';
import {CollectionActions} from '@store/modules/Collections';
import {collectionSelector} from '@store/modules/Collections/selectors';
import {contactsSelector} from '@store/modules/Contacts/selectors';
import {useEffect, useState} from 'react';
import {SectionListData} from 'react-native';
import {Contact} from 'react-native-contacts';
import {useSelector} from 'react-redux';

export type SearchResultsSection = SectionListData<
  Contact | User,
  {
    key: TeamUserType;
  }
>;

export function useGetSearchResultsSegments() {
  const {data, searchQuery, error, loading, refresh, refreshing} =
    useFetchCollection({
      selector: collectionSelector('usersSearch'),
      action: CollectionActions.SEARCH_USERS,
    });
  const contacts = useSelector(contactsSelector);

  const [sections, setSections] = useState<SearchResultsSection[]>([]);

  useEffect(() => {
    setSections([]);
  }, [searchQuery]);

  useEffect(() => {
    if (!error && !loading && searchQuery) {
      const usersByReferralType = new Map<TeamUserType, (User | Contact)[]>();
      data.forEach((user: User) => {
        if (user.referralType) {
          const segment = usersByReferralType.get(user.referralType) ?? [];
          segment.push(user);
          usersByReferralType.set(user.referralType, segment);
        }
      });
      const searchQueryNormalised = searchQuery.toLowerCase().trim();
      contacts.forEach((contact: Contact) => {
        if (
          contact.givenName?.toLowerCase()?.includes(searchQueryNormalised) ||
          contact.middleName?.toLowerCase()?.includes(searchQueryNormalised) ||
          contact.familyName?.toLowerCase()?.includes(searchQueryNormalised) ||
          contact.displayName?.toLowerCase()?.includes(searchQueryNormalised)
        ) {
          const segment = usersByReferralType.get(AGENDA) ?? [];
          segment.push(contact);
          usersByReferralType.set(AGENDA, segment);
        }
      });

      const newSections: SearchResultsSection[] = [];
      usersByReferralType.forEach((value, referralType) => {
        if (value.length) {
          newSections.push({
            key: referralType,
            data: value,
          });
        }
      });
      setSections(newSections);
    }
  }, [data, searchQuery, loading, error, contacts]);

  return {sections, loading, error, searchQuery, refresh, refreshing};
}
