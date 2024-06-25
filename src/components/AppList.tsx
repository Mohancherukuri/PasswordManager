import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';

import {Text, View} from 'react-native-animatable';
import {appListDataWithSelection} from '../config/appListData';
import InputBar from './InputBar';
import {searchFunction} from '../scripts/search';

type DataItem = {
  id: string;
  title: string;
  selected: boolean;
};

type AppListProps = {
  setSelectedApp: any;
  setNewApp: any;
};

const AppList = ({setSelectedApp, setNewApp}: AppListProps) => {
  //Search Bar Variable
  const [searchTerm, setSearchTerm] = useState<string>('');

  //App list
  const init = [
    { id: 'addNew', title: '+ New App', selected: false },
    ...appListDataWithSelection.map(item => ({ ...item }))
  ];

  let [data, setData] = useState<DataItem[]>(init);

  
  //Change the style and selected value of the app.
  const handleSetData = (id: string) => {
    setData(
      data.map(item => {
        if (item.id === id) {
          item.selected = true;
          return item;
        }
        item.selected = false;
        return item;
      }),
    );
  };

  //Action to Take when a app button is selected.
  const handleAppClick = (id: string) => {
    //Check if Add new button is pressed or not.
    if (id === 'addNew') {
      handleSetData(id);
      setNewApp(true);
      setSelectedApp('');
    } else {
      handleSetData(id);
      setNewApp(false);

      //Set the data for the form
      const selectedItem = data.filter(item => item.selected === true);
      if (selectedItem.length > 0) {
        setSelectedApp(selectedItem[0].title);
      } else {
        setSelectedApp('');
      }
    }
  };

  //Handle the Search Bar.
  const handleSearch = (text: string) => {
    if (text === '') {
      setData(init);
    } else {
      setData(searchFunction(text));
    }
    setSearchTerm(text);
  };

  //The App Buttons Render
  const renderItem = ({item}: {item: DataItem}) => (
    <Pressable
      style={[styles.itemContainer, item.selected && styles.selectedItem]}
      onPress={() => handleAppClick(item.id)}>
      <Text style={styles.itemText}>{item.title}</Text>
    </Pressable>
  );

  return (
    <>
      <View style={{paddingHorizontal: 30}}>
        <InputBar
          icon="search"
          placeholder="Search..."
          value={searchTerm}
          onChangeText={text => handleSearch(text)}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 15,
  },
  itemContainer: {
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  selectedItem: {
    backgroundColor: 'lightgreen', // Background color when selected
  },
  itemText: {
    fontSize: 16,
    color : "#000"
  },
});

export default AppList;
