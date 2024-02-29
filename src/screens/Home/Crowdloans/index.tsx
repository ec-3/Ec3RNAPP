import React, { useCallback, useEffect, useMemo } from 'react';
// import i18n from 'utils/i18n/i18n';
// import { ListRenderItemInfo } from 'react-native';
// import { CrowdloanItem } from 'screens/Home/Crowdloans/CrowdloanItem';

// import { RocketLaunch } from 'phosphor-react-native';
// import useGetCrowdloanList from 'hooks/screen/Home/Crowdloans/useGetCrowdloanList';
// import { FlatListScreen } from 'components/FlatListScreen';
// import { EmptyList } from 'components/EmptyList';
// import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
// import { setAdjustPan } from 'rn-android-keyboard-adjust';
// import { useIsFocused } from '@react-navigation/native';
// import { CrowdloanItemType } from 'types/index';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDollarSign, faBroadcastTower, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardNumber: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#FFF',
    fontSize: 18,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeaderText: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableRowText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0F0',
  },
  buttonOutlineText: {
    color: '#0F0',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
});

// const renderItem = ({ item }: ListRenderItemInfo<CrowdloanItemType>) => {
//   return <CrowdloanItem item={item} />;
// };

// const renderListEmptyComponent = () => {
//   return (
//     <EmptyList
//       title={i18n.emptyScreen.crowdloanEmptyTitle}
//       icon={RocketLaunch}
//       message={i18n.emptyScreen.crowdloanEmptyMessage}
//     />
//   );
// };

// enum FilterValue {
//   POLKADOT_PARACHAIN = 'Polkadot parachain',
//   KUSAMA_PARACHAIN = 'Kusama parachain',
//   WINNER = 'completed',
//   FAIL = 'failed',
// }

export const CrowdloansScreen = () => {
  // const theme = useSubWalletTheme().swThemes;
  // const items: CrowdloanItemType[] = useGetCrowdloanList();
  // // const [isRefresh, refresh] = useRefresh();
  // const isFocused = useIsFocused();
  // const defaultFilterOpts = [
  //   { label: i18n.filterOptions.polkadotParachain, value: FilterValue.POLKADOT_PARACHAIN },
  //   { label: i18n.filterOptions.kusamaParachain, value: FilterValue.KUSAMA_PARACHAIN },
  //   { label: i18n.filterOptions.win, value: FilterValue.WINNER },
  //   { label: i18n.filterOptions.fail, value: FilterValue.FAIL },
  // ];
  // const crowdloanData = useMemo(() => {
  //   const result = items.sort(
  //     // @ts-ignore
  //     (firstItem, secondItem) => secondItem.convertedContribute - firstItem.convertedContribute,
  //   );

  //   return result;
  // }, [items]);

  // useEffect(() => {
  //   if (isFocused) {
  //     setAdjustPan();
  //   }
  // }, [isFocused]);

  // const doFilterOptions = useCallback((itemList: CrowdloanItemType[], searchKeyword: string) => {
  //   const lowerCaseSearchKeyword = searchKeyword.toLowerCase();
  //   // const result = getListByFilterOpt(itemList, filterOpts);
  //   if (searchKeyword.length > 0) {
  //     return itemList.filter(({ chainDisplayName }) => chainDisplayName.toLowerCase().includes(lowerCaseSearchKeyword));
  //   }
  //   return itemList;
  // }, []);

  // function getListByFilterOpt(crowdloanItems: CrowdloanItemType[], filterOptions: string[]) {
  //   if (filterOptions.length === 0) {
  //     return crowdloanItems;
  //   }
  //   let result: CrowdloanItemType[];
  //   result = crowdloanItems.filter(({ relayParentDisplayName, paraState = '' }) => {
  //     if (filterOptions.includes(relayParentDisplayName) || filterOptions.includes(paraState)) {
  //       return true;
  //     }
  //     return false;
  //   });

  //   return result;
  // }
  const cubes = [
    { id: 1, reward: '200eCT', deadline: '01-06-2024' },
    { id: 2, reward: '100eCT', deadline: '01-06-2024' },
    { id: 3, reward: '50eCT', deadline: '01-06-2024' },
  ];

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Cube Overview</Text>
    
    <View style={styles.card}>
      <Text style={styles.cardNumber}>3</Text>
      <Text style={styles.cardText}>Ec³ Cube</Text>
    </View>
    
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Ec³ cube No.</Text>
        <Text style={styles.tableHeaderText}>Rewards</Text>
        <Text style={styles.tableHeaderText}>Calc. Deadline</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableRowText}>#1</Text>
        <Text style={styles.tableRowText}>200ECT</Text>
        <Text style={styles.tableRowText}>01-06-2024</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableRowText}>#2</Text>
        <Text style={styles.tableRowText}>100ECT</Text>
        <Text style={styles.tableRowText}>01-06-2024</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableRowText}>#3</Text>
        <Text style={styles.tableRowText}>50ECT</Text>
        <Text style={styles.tableRowText}>01-06-2024</Text>
      </View>
    </View>
    
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Get all rewards</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
      <Text style={[styles.buttonText, styles.buttonOutlineText]}>Connect new cube</Text>
    </TouchableOpacity>
  </View>
  );
  // <>
  //   <FlatListScreen
  //     isShowFilterBtn
  //     title={i18n.header.crowdloans}
  //     titleTextAlign={'left'}
  //     flatListStyle={{ paddingHorizontal: theme.padding, gap: theme.sizeXS, paddingBottom: 8 }}
  //     renderListEmptyComponent={renderListEmptyComponent}
  //     renderItem={renderItem}
  //     autoFocus={false}
  //     items={crowdloanData}
  //     showLeftBtn={false}
  //     searchFunction={doFilterOptions}
  //     filterOptions={defaultFilterOpts}
  //     filterFunction={getListByFilterOpt}
  //     isShowMainHeader
  //     placeholder={i18n.placeholder.searchProject}
  //     // rightIconOption={{ icon: FunnelSimple, onPress: () => setModalVisible(true) }}
  //     // refreshControl={
  //     //   <RefreshControl
  //     //     style={{ backgroundColor: ColorMap.dark1 }}
  //     //     tintColor={ColorMap.light}
  //     //     refreshing={isRefresh}
  //     //     onRefresh={() => refresh(restartSubscriptionServices(['crowdloan']))}
  //     //   />
  //     // }
  //   />
  // </>
};
