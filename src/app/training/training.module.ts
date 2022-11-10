import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { CurrentComponent } from "./current-trainig/current-training.component";
import { StopTrainingComponent } from "./current-trainig/stop-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { TrainingRoutingModule } from "./training-routing.module";
import { TrainingComponent } from "./training.component";
import { trainingReducer } from "./training.reducer";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent,
    ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer)
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})


export class TrainingModule {

}