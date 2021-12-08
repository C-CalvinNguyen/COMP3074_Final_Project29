import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image } from "react-native";

export default function Weather(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.long}&units=metric&appid=0e9c4b87156665f399dfd568164bbb6e`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
        setData([]);
      })
      .finally(() => setIsLoading(false));
  }, [props]);

  const getDayWordFormat = (num) => {
    switch (num) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "Unknown";
    }
  };

  const renderItem = ({ item }) => {
    const date = new Date(item.dt * 1000);
    return (
      <View>
        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          }}
          style={{ width: 40, height: 40 }}
        />
        <Text>{item.weather[0].main}</Text>
        <Text>{getDayWordFormat(date.getDay())}</Text>
        <Text>{item.temp.day} C</Text>
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <Text>Loading ...</Text>
      ) : (
        <FlatList
          data={data.daily}
          renderItem={renderItem}
          keyExtractor={(item, index) => "key" + index}
        ></FlatList>
      )}
    </>
  );
}
