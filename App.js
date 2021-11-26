import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Platform,
} from 'react-native';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';
import * as ImagePicker from 'expo-image-picker';

figlet.parseFont('Standard', standard);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function App() {
  const [statut, setStatut] = useState('Non démarré');
  const [image, setImage] = useState(null);
  const [taille, setTaille] = useState([200, 200]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    figlet.text(
      'Image reçue avec succès',
      {
        font: 'Standard',
        horizontalLayout: 'full',
      },
      function (err, data) {
        console.log(data);
      }
    );

    setStatut('Non démarré');

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function demo() {
    for (let i = 0; i < 101; i++) {
      await sleep(50);
      setStatut(`${i}%`);
    }
    figlet.text(
      'Peinture complétée!',
      {
        font: 'Standard',
        horizontalLayout: 'full',
      },
      function (err, data) {
        console.log(data);
      }
    );
  }

  const changerTaille = (agrandir) => {
    if (agrandir) {
      setTaille((taille) => taille.map((item) => (item += 10)));
    } else {
      setTaille((taille) => taille.map((item) => (item -= 10)));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.start} onPress={pickImage}>
        <Text style={styles.startText}>Choisissez une image</Text>
      </TouchableOpacity>
      <View style={styles.preview}>
        <Text style={styles.previewText}>Prévisualisation</Text>
      </View>
      <View style={styles.image}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: taille[0], height: taille[1] }}
          />
        )}
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlsBtn}
          onPress={() => changerTaille(false)}
        >
          <Text style={styles.startText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlsBtn}
          onPress={() => changerTaille(true)}
        >
          <Text style={styles.startText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.start}
        onPress={() => {
          demo();
          figlet.text(
            'Début du processus de peinture...',
            {
              font: 'Standard',
              horizontalLayout: 'full',
            },
            function (err, data) {
              console.log(data);
            }
          );
        }}
      >
        <Text style={styles.startText}>Démarrer Picasso</Text>
      </TouchableOpacity>

      <View style={styles.status}>
        <Text style={styles.statusText}>Statut: {statut}</Text>
      </View>

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 0,
    marginTop: 5,
  },
  preview: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 50,
    borderRadius: 0,
    marginTop: 15,
  },
  previewText: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  start: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 300,
    height: 50,
    alignItems: 'center',
    marginTop: 15,
  },
  startText: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 300,
    height: 50,
    alignItems: 'center',
    marginTop: 15,
  },
  statusText: {
    marginVertical: 15,
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  controlsBtn: {
    backgroundColor: '#fff',
    width: 145,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal: 5,
  },
});
