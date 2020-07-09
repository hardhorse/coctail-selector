import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import CaliforniaImg from './img/california.png';
import ChistyKaifImg from './img/chisty-kaif.png';
import HodimPoKrayImg from './img/hodim-po-kray.png';
import LubovImg from './img/lubov.png';
import MoyaVselennayaImg from './img/moya-vselennaya.png';
import SolncaNeVidno from './img/solnca-ne-vidno.png';

import MainImg from './img/main.png';

import {questions, COCTAILS} from './questions';

import './App.css';

const imageMapping = {
  [COCTAILS.california]: CaliforniaImg,
  [COCTAILS.chistyKaif]: ChistyKaifImg,
  [COCTAILS.hodimPoKrau]: HodimPoKrayImg,
  [COCTAILS.lubovBexPamyati]: LubovImg,
  [COCTAILS.moyaVselennaya]: MoyaVselennayaImg,
  [COCTAILS.solncaNeVidno]: SolncaNeVidno,
}


const useStyles = makeStyles((theme) => ({
  roundedButton: {
    borderRadius: 30,
    marginTop: 20,
  },
  controlLabel: {
    fontSize: 18,
    lineHeight: 1.2,
  }
}));

const QuestionCard = ({
  question,
  options,
  index,
  onSubmit,
  isLastQuestion,
}) => {
const [value, setValue] = React.useState('');
const [isShown, setIsShown] = React.useState(false)
const handleChange = (event) => {
  setValue(event.target.value);
};
setTimeout(() => setIsShown(true), 100);
const styles = useStyles();
return (
  <Fade in={isShown}>
    <Card variant="outlined">
      <CardContent>
        <Typography style={{marginBottom: 20}} variant="h5">{question}</Typography>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup name={`question${index}`} value={value} onChange={handleChange}>
            {options.map((item, index) => <FormControlLabel style={{ marginBottom: 10 }} classes={{label: styles.controlLabel}} key={index} value={item.key} control={<Radio />} label={item.label} />)}
          </RadioGroup>
          <Button disabled={!value} onClick={() => {
            onSubmit(value);
            setValue('')
          }} fullWidth style={{marginTop: 20}} variant="outlined" color="primary">
            { isLastQuestion ? 'Получить коктейль!' : 'Давай дальше!' }
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  </Fade>
  )
}

const STATUSES = {
  init: 'init',
  question: 'question',
  result: 'result'
}

const getOftenElement = arr => {
  const b=[];
  let max='', maxi=0;
  for(var k in arr) {
      b[k] ? b[k]++ : b[k]=1;
      if(maxi<b[k]) { max=k; maxi=b[k] }
  }

  return maxi
}


const theme = createMuiTheme({
  typography: {
    fontFamily: "'Crimson Text', serif",
    lineHeight: 1,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': "'Crimson Text', serif",
      },
    },
  },
});

function App() {
  const questionNumber = questions.length;
  const values = React.useRef([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [status, setStatus] = React.useState(STATUSES.init);

  const handleNextSlide = (value) => {
    values.current.push(value);
    if (currentQuestion === questionNumber -1) {
      setStatus(STATUSES.result);
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  }

  const isLastQuestion = currentQuestion === questionNumber -1;

  const handleReset = () => {
    values.current = [];
    setCurrentQuestion(0);
    setStatus(STATUSES.init);
  }

  const classes = useStyles();

  return (
    <div >
      <div className={'hiddenImages'}>
        {Object.values(imageMapping).map(image => <img key={image} src={image} alt={image} />)}
      </div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          {
            status === STATUSES.question &&
              <QuestionCard isLastQuestion={isLastQuestion} index={currentQuestion} onSubmit={handleNextSlide} {...questions[currentQuestion]}/>
          }
          {
            status === STATUSES.init &&
              <div className="welcomeScreen">
                <img className="imgWithBounceAnimation" style={{width: '100%'}} src={MainImg} alt="main-img"/>
                <Button className={classes.roundedButton} size="large" onClick={() => setStatus(STATUSES.question)} variant="contained" color="secondary">
                  Я хочу коктейль!
                </Button>
              </div>
          }
          {
            status === STATUSES.result && <div className="finalScreen">
              <Typography align="center" variant="h5">Ваш коктейль:</Typography>
              <img className="imgWithUpDownAnimation" alt="Коктейль" src={imageMapping[values.current[getOftenElement(values.current)]]} />

              <Button size="large" onClick={handleReset} className={classes.roundedButton} variant="contained" color="secondary">
                Хочу ещё один!
                </Button>
            </div>
          }
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
