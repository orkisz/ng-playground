import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { interval, MonoTypeOperatorFunction, pipe, Subject } from 'rxjs';

function withSubscriptionCount<T>(callback: (count: number) => void): MonoTypeOperatorFunction<T> {
  return pipe();
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private _mySubject = new Subject<number>();
  private _withCount = this._mySubject.pipe(
    withSubscriptionCount(count => console.log('Current subscribers: ', count))
  );
  title = 'ng-playground';

  counter: number = 0;

  ngOnInit(): void {
    interval(1e3).subscribe(value => {
      this.counter = value;
    });

    for (var i = 0; i < 3; i++) {
      setTimeout(() => {
        console.log(i);
      });
    }

    const sub1 = this._withCount.subscribe();
    const sub2 = this._withCount.subscribe();
    const sub3 = this._withCount.subscribe();
    sub3.unsubscribe();
    sub2.unsubscribe();
  }
}
