import { ErrorAlertModel, GdevAlert, GdevAuth, GdevCache } from '@jgu7man/gdev-tools';
import { Injectable } from '@angular/core';
import { iRolSelect, iUser } from 'src/app/models/user.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  public Roles: iRolSelect[] = [
    {value: 'admin', display:'Administrador'},
    {value: 'city-manager', display:'City Manager'},
    {value: 'lavanderia', display:'Personal de Lavandería'},
    {value: 'limpieza', display:'Personal de Limpieza'},
  ]

  adminList: iUser[] = []
  personalMap: Map<string,iUser> = new Map()

  constructor(
    private _alert: GdevAlert,
    private _afs: AngularFirestore,
    private _afAuth: AngularFireAuth,
    private _router: Router,
    private _cache: GdevCache
  ) { }

  get personalRef() {
    return this._afs.collection('users').ref
  }

  displayRol(value: string): string {
    let display = this.Roles.find(r => r.value === value)?.display
    return display ? display : ''
  }


  async pretendCreateUser( member: iUser) {
    var adminFinded = this.adminList
      .find( a => a.email == member.email )

      if ( adminFinded ) {
        this._alert.sendMessageAlert('Este correo ya está en uso, por favor elige otro')
      } else {

        this.personalRef.doc(member.email).set(member)


        this._afs.collection( 'mail' ).ref.add( {
          to: member.email,
          message: {
            subject: `Bienvenido a Guestify Ops Blancos`,
            text: `Se te ha invitado a ser ${ this.displayRol(member.rol) } de Guestify Ops Blancos\n
            Por favor da click en el siguiente enlace:\n
            https://guestify-ops-blancos.web.app/create`
          }
        } )

        this._alert.sendFloatNotification('Se ha envido un correo al usuario nuevo')

      }
      return

  }

  async createUser(email: string, password: string): Promise<iUser | null> {

    const user: iUser = await ( await this.personalRef.doc( email )
      .get() ).data() as iUser

    if ( !user ) {
      this._alert.sendMessageAlert('Lo sentimos, no esperamos una confirmación con esta dirección de email. Revisa que esté bien o itenta con otra. Si aún así no logras ingresar, ponte en contacto con un administrador del sitio')
      return null
    } else {

      try {

        var nuevoAdmin = await this._afAuth
          .createUserWithEmailAndPassword( email, password );
        user.uid = nuevoAdmin.user?.uid as string

        this.updateUserData( user )
        this.personalRef.doc(email).delete()

        // this._router.navigate(['/'])
        return user
      } catch ( error ) {
        console.error( error );
        this.setErrorMsj(error)
        return null
      }
    }

  }


  getPersonal() {
    return this._afs.collection<iUser>('users').valueChanges()
      .pipe( tap(list => this.mapPersonal(list)) )
  }

  mapPersonal(list: iUser[]) {
    list.forEach(user => {
      this.personalMap.set(user.uid, user)
    })
    return this.personalMap
  }

  getMemberData(uid: string): iUser {
    if (this.personalMap.size == 0) {
       this.getPersonal().pipe(take(1)).toPromise()
    }
    return this.personalMap.get(uid) as iUser
  }

  private async updateUserData( user: iUser ) {
    const adminRef: AngularFirestoreDocument<iUser>
      = this._afs.doc( `users/${ user.uid }` );
    adminRef.set( user, { merge: true } )
    this._cache.updateData( 'user', {...user} )
  }

  setErrorMsj( error: any ) {
    let errorObj = new ErrorAlertModel('', error.code)
    switch (true) {
      case error.code.includes('not-found'):
        errorObj.mensaje = 'No se encontró el email'
        break;
      case error.code.includes( 'invalid' ):
        errorObj.mensaje = 'Escribe una direccion de correo válida'
        break;
      case error.code.includes( 'wrong-password' ):
        errorObj.mensaje = 'Contraseña incorrecta'
        break;

      default:
        errorObj.mensaje = 'Error de inicio de sesión'
        break;
    }


    this._alert.errorAlert$.next( errorObj )

  }


  async getUser(uid: string): Promise<iUser> {
    return await (await this._afs.collection('users')
      .ref.doc(uid).get()).data() as iUser
  }

}
