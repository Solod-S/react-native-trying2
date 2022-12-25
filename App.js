import { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const image = require("./assets/images/stars-on-night.jpg");

const initialState = {
  email: "",
  password: "",
};

const loadApplication = async () => {
  await Font.loadAsync({
    "Rubik-Gemstones": require("./assets/fonts/RubikGemstones-Regular.ttf"),
  });
};

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;

      setdimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => {
      dimensionsHandler.remove();
    };
  }, []);

  console.log(isShowKeyboard);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      {/* при клике вне формы */}
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            {/* KeyboardAvoidingView нужен для поднятия того что обвернуто вверх при вызове айос клавиатуры */}
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 100,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Hello again</Text>
                <Text style={styles.headerTitle}>Welcome back</Text>
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.inputTitle}> EMAIL ADRESS</Text>
                <TextInput
                  value={state.email}
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.inputTitle}> PASSWORD </Text>
                <TextInput
                  value={state.password}
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              {/* <Button title="LOG IN" /> */}
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>LOG IN</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 80,
  },
  headerTitle: {
    fontSize: 30,
    color: "#fffaf0",
    fontFamily: "Rubik-Gemstones",
  },
  form: {
    // marginHorizontal: 20,
  },
  input: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fffaf0",
    color: "#fffaf0",
  },
  inputTitle: {
    color: "#fffaf0",
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Rubik-Gemstones",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    minWidth: 200,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    borderWidth: 1,
    fontFamily: "Rubik-Gemstones",
    ...Platform.select({
      ios: {
        backgroundColor: "#fffaf0",
        backgroundColor: "#transparent",
      },
      android: {
        backgroundColor: "transparent",
        backgroundColor: "#4169e1",
      },
      default: {
        // other platforms, web for example
        backgroundColor: "transparent",
        backgroundColor: "#4169e1",
      },
      // borderColor: Platform.OS === "android" ? "transparent" : "#fffaf0",
      // backgroundColor: Platform.OS === "android" ? "#4169e1" : "transparent",
    }),
  },
  btnTitle: {
    ...Platform.select({
      ios: {
        color: "#4169e1",
      },
      android: {
        color: "#fffaf0",
      },
      default: {
        // other platforms, web for example
        color: "#fffaf0",
      },
      // color: Platform.OS === "android" ? "#fffaf0" : "#4169e1",
    }),
    // на андроиде один цвет, а на айОС другой
  },
});
