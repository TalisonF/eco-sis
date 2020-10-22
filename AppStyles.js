export const AppStyles = {
    color: {
        roxo: "#6759AB",
        verdeClaro: "#00CC63",
        verdeEscuro: "#07522C",
        preto: "#141414",
        vermelho: "#cc1400"
    }
};

export const AppImages = {
    images: {
        Logo: require("./assets/img/logo.png")
    }
}

export const plantao = {
    temPlantao : {
        customStyles: {
          container: {
            backgroundColor: 'green'
          },
          text: {
            color: '#eee',
            fontWeight: 'bold'
          }
        }
      }
      , plantaoNegociacao : {
        customStyles: {
          container: {
            backgroundColor: 'yellow'
          },
          text: {
            color: 'black',
            fontWeight: 'bold'
          }
        }
      }
      ,
      plantaoErro : {
        customStyles: {
          container: {
            backgroundColor: 'red'
          },
          text: {
            color: 'white',
            fontWeight: 'bold'
          }
        }
      }
}
