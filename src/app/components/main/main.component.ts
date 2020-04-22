import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    public deck;
    public numCards: number = 20;
    public showCards: boolean;
    public workoutDeck: any;
    public previousCardNumber: number = -1;
    public currentCardNumber: number = 0;
    public defaultCardNumber: number = 20;
    public suits = ['s', 'd', 'c', 'h'];
    public values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

    public reps: number;
    public rest: boolean;
    public exercise: any;
    public exercisesJson = require('./exercises.json');

    public cCounter: number = 0;
    public dCounter: number = 0;
    public hCounter: number = 0;
    public sCounter: number = 0;

    constructor(private changeDetector: ChangeDetectorRef) { }

    public ngOnInit() {
        this.deck = this.createDeck();
        this.shuffleDeck(this.deck);
    }

    public createCards(): void {
        this.showCards = true;
        this.workoutDeck = this.deck.slice(0,this.numCards);
        this.displayExercise();
    }

    public resetCards(): void {
        this.showCards = false;
        this.deck = undefined;
        this.deck = this.createDeck();
        this.shuffleDeck(this.deck);
        this.workoutDeck = this.deck.slice(0,this.numCards);
        this.showCards = true;
        this.reps = undefined;
        this.rest = false;
        this.exercise = undefined;
        this.currentCardNumber = 0;
        this.previousCardNumber = -1;
        this.displayExercise();
    }

    public createDeck() {
        let deck = new Array();
        let card;
        for(let i=0; i < this.suits.length; i++) {
            for(let n=0; n < this.values.length; n++) {
                card = {value: this.values[n], suit: this.suits[i]};
                deck.push(card);
            }
        }
        return deck;
    }

    public shuffleDeck(deck) {
        let location1;
        let location2;
        let temp;
        for(let i = 0; i < 2000; i++) {
            location1 = Math.floor((Math.random() * deck.length));
            location2 = Math.floor((Math.random() * deck.length));
            temp = deck[location1];

            deck[location1] = deck[location2];
            deck[location2] = temp;
        }
    }

    public displayExercise() {
        const currentCard = this.workoutDeck[this.currentCardNumber]
        console.log(currentCard);
        if (currentCard.value !== 1) {
            this.rest = undefined
            this.reps = Number(currentCard.value)+10;

            if (currentCard.suit === 'c') {
                this.exercise = this.exercisesJson.c[this.cCounter];
                this.cCounter += 1;
            } else if (currentCard.suit === 'd') {
                this.exercise = this.exercisesJson.d[this.dCounter];
                this.dCounter += 1;
            } else if (currentCard.suit === 'h') {
                this.exercise = this.exercisesJson.h[this.hCounter];
                this.hCounter += 1;
            } else if (currentCard.suit === 's') {
                this.exercise = this.exercisesJson.s[this.sCounter];
                this.sCounter += 1;
            }
    
            if (this.cCounter > 3) {
                this.cCounter = 0;
            } else if (this.dCounter > 3) {
                this.dCounter = 0;
            } else if (this.hCounter > 3) {
                this.hCounter = 0;
            } else if (this.sCounter > 3) {
                this.sCounter = 0;
            }
        } else {
            this.exercise = undefined;
            this.reps = undefined;
            this.rest = true;
        }
    }

    public incrementCardCounter() {
        this.displayExercise();
        this.currentCardNumber += 1;
        this.previousCardNumber += 1;
    }

    public decrementCardCounter() {
        this.displayExercise()
        this.currentCardNumber -= 1;
        this.previousCardNumber -= 1;
    }
}
