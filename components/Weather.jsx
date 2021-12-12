import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";

export default function Weather(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.long}&exclude=hourly,minutely,current,alerts&units=metric&appid=0e9c4b87156665f399dfd568164bbb6e`
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

  const getIdColor = (id) => {
    switch (true) {
          // Thunderstorm
      case id >= 200 && id <= 232:
        return "#dcb7df";
            // Drizzle
      case id >= 300 && id <= 321:
        return "#afe1f4";
            // Rain
      case id >= 500 && id <= 531:
        return "#76baf4";
            // Snow
      case id >= 600 && id <= 622:
        return "#d5dfe7";
            // Atmosphere (Unique Weather)
      case id >= 701 && id <= 781:
        return "#ed7070";
            // Clear
      case id == 800:
        return "#eae8bc";
            // Clouds
      case id >= 801 && id <= 804:
        return "#d1dede";
    }
    // Thunderstorm
    // if (id >= 200 && id <= 232) {
    //   return '#dcb7df'
    // }
    // // Drizzle
    // if (id >= 300 && id <= 321) {
    //   return '#afe1f4'
    // }
    // // Rain
    // if (id >= 500 && id <= 531) {
    //   return '#76baf4'
    // }
    // // Snow
    // if (id >= 600 && id <= 622) {
    //   return '#d5dfe7'
    // }
    // // Atmosphere (Unique Weather)
    // if (id >= 701 && id <= 781) {
    //   return '#ed7070'
    // }
    // // Clear
    // if (id == 800) {
    //   return '#eae8bc'
    // }
    // // Clouds
    // if (id >= 801 && id <= 804) {
    //   return '#d1dede'
    // }
  };

  const getDayStyle = (id) => {
    return {
      padding: 20,
      margin: 3,
      borderRadius: 20,
      position: "relative",
      overflow: "hidden",
      height: 100,
      backgroundColor: `${getIdColor(id)}`,
    };
  };

  const renderItem = ({ item }) => {
    const date = new Date(item.dt * 1000);

    return (
      <View style={getDayStyle(item.weather[0].id)}>
        <Image
          style={styles.icon}
          source={{
            uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          }}
        />

        <Text style={styles.dayOfWeek}>{getDayWordFormat(date.getDay())}</Text>

        <Text style={styles.weather}>{item.weather[0].main}</Text>

        <Text style={styles.temperature}>
          {item.temp.day.toFixed(1)} &#176;C
        </Text>
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <Text>Loading ...</Text>
      ) : (
        <FlatList
          style={{ marginBottom: 150, borderRadius: 6 }}
          data={data.daily}
          renderItem={renderItem}
          keyExtractor={(item, index) => "key" + index}
        ></FlatList>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
    position: "absolute",
  },
  temperature: {
    position: "absolute",
    left: "85%",
    top: "50%",
    fontSize: 25,
    fontWeight: "bold",
  },
  dayOfWeek: {
    position: "absolute",
    top: "10%",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  weather: {
    position: "absolute",
    top: "75%",
    left: "0%",
    right: 0,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});
