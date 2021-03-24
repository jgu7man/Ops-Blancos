import { AfterContentInit, ContentChild, ContentChildren, Directive, Input, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
export class CustomAppendable { }

@Directive({
  selector: '[gdevDrawerTemplate]'
})
export class DrawerTemplateDirective implements AfterContentInit{

  @ContentChild( CustomAppendable, { read: ViewContainerRef } ) appendable?: ViewContainerRef;
  @Input() template?: TemplateRef<any>;

  constructor () { }

  ngAfterContentInit() {
    setTimeout( () => {
      this.appendable?.createEmbeddedView( this.template as TemplateRef<any>)
    } );
  }

}
