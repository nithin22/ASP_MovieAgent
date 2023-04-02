import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private http: HttpClient) {}

  getData() {
    let url: string =
      'https://cors-anywhere.herokuapp.com/http://wave.ttu.edu/ajax.php';
    let editor: string =
      'sorts' +
      '    #movies = {star_wars, the_matrix, inception, the_godfather, the_shawshank_redemption}.' +
      '    #genres = {scifi, action, thriller, drama}.' +
      '    #directors = {george_lucas, the_wachowskis, christopher_nolan, francis_ford_coppola, frank_darabont}.' +
      'predicates' +
      '    genre(#movies, #genres).' +
      '    directed_by(#movies, #directors).' +
      '    movie_title(#movies).' +
      'rules' +
      '    genre(star_wars, scifi).' +
      '    genre(the_matrix, scifi).' +
      '    genre(inception, thriller).' +
      '    genre(the_godfather, drama).' +
      '    genre(the_shawshank_redemption, drama).' +
      '    directed_by(star_wars, george_lucas).' +
      '    directed_by(the_matrix, the_wachowskis).' +
      '    directed_by(inception, christopher_nolan).' +
      '    directed_by(the_godfather, francis_ford_coppola).' +
      '    directed_by(the_shawshank_redemption, frank_darabont).' +
      '    movie_title(star_wars).' +
      '    movie_title(the_matrix).' +
      '    movie_title(inception).' +
      '    movie_title(the_godfather).' +
      '    movie_title(the_shawshank_redemption).';
    let data: String = 
    // encodeURIComponent(
    //   'action:' +
    //     'getQuery \n' +
    //     'query:' +
    //     'genre(star_wars, scifi) \n' +
    //     'editor:' +
    //     editor
    // );

    'action=getQuery&query=friend(alex%2Clino)&editor=sorts%0A++++%23people+%3D+%7Btommy%2C+alex%2C+john%2C+daniel%2C+sarah%2C+peter%2C+lino%7D.%0A++++%23gender+%3D+%7Bmale%2C+female%7D.%0Apredicates%0A++++advisor(%23people%2C+%23people).%0A++++friend(%23people%2C+%23people).%0A++++gender(%23people%2C%23gender).%0A++++spanish(%23people).%0Arules%0A++++advisor(tommy%2C+alex).%0A++++advisor(tommy%2C+john).%0A++++advisor(tommy%2C+daniel).%0A++++advisor(tommy%2C+lino).%0A++++friend(lino%2C+alex).%0A++++friend(lino%2C+peter).%0A++++friend(sarah%2C+alex).%0A++++friend(X%2C+Y)%3A-friend(Y%2CX).%0A++++gender(tommy%2Cmale).%0A++++gender(lino%2Cmale).%0A++++gender(sarah%2C+female).%0A++++spanish(lino).';
    
    this.http
      .request('POST', url, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: data,
        responseType: 'text',
      })
      .pipe(catchError(this.handleError))
      .subscribe((resp) => {
        console.log(resp);
      });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
