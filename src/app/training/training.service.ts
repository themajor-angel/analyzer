import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Subject } from "rxjs";
import { Exercise } from "./exercise.model"
import { map, take } from 'rxjs/operators';
import { Subscription } from "rxjs";
import { UIservice } from "../shared/ui.service";
import * as fromTraining from './training.reducer';
import { Store } from "@ngrx/store";
import * as UI from '../shared/ui.actions'
import * as Training from './training.actions'

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIservice,
        private store: Store<fromTraining.State>){}

    fetchAvailableExercises(){
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.db
            .collection('availableExercises')
            .snapshotChanges().pipe(map(docArray => {
                return docArray.map(doc => {
                  return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data()['name'],
                    duration: doc.payload.doc.data()['duration'],
                    calories: doc.payload.doc.data()['calories']
                  };
                });
              }))            
            .subscribe((exercises: Exercise[]) => {
              this.store.dispatch(new UI.StopLoading());
              this.store.dispatch(new Training.SetAvailableTrainings(exercises));
            }, error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar('Fetching exercises failed', null, 3000)
                this.exercisesChanged.next(null);
            }));
    }
    
    startExercise(selectedId: string){
       this.store.dispatch(new Training.StartTraining(selectedId));

    }

    completedExercise(){
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                state: 'completed'
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    cancelExercise(progress: number){
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    fetchAllExercises(){
        this.fbSubs.push(this.db
            .collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new Training.SetFinishedTrainings(exercises));
            }));
    }

    cancelSubscriptions(){
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise){
        this.db.collection('finishedExercises').add(exercise);
    }
}