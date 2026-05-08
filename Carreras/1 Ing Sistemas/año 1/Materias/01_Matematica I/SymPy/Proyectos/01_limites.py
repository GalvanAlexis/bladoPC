"""
Mini Proyecto 1: Calculadora de Limites con SymPy
========================================
Calcula limites de funciones: basicos, infinitos, laterales
"""

import sympy as sp
from sympy import oo

def linea():
    print("=" * 50)

def header(titulo):
    linea()
    print(f"  {titulo}")
    linea()

def calcular_limite():
    x = sp.symbols('x')
    
    print("\nIngresa la funcion f(x) en formato Python:")
    print("Ejemplos: 1/x, sin(x)/x, (x**2 - 1)/(x - 1)")
    func_str = input("f(x) = ")
    
    try:
        f = sp.sympify(func_str)
        print(f"\nFuncion: ", end="")
        sp.pprint(f)
        
        print("\nTipo de limite:")
        print("1. Limite basico (x -> a)")
        print("2. Limite infinito (x -> oo)")
        print("3. Limite lateral (x -> 0+ o 0-)")
        
        opcion = input("Opcion [1-3]: ").strip()
        
        if opcion == "1":
            print("\nIngresa el valor de a:")
            a_str = input("a = ").strip()
            try:
                a = sp.sympify(a_str)
                limite = sp.limit(f, x, a)
                print(f"\nlim(x -> {a}) ", end="")
                sp.pprint(f)
                print(" = ", end="")
                sp.pprint(limite)
            except:
                print("Error: valor invalido")
                
        elif opcion == "2":
            limite = sp.limit(f, x, oo)
            print(f"\nlim(x -> oo) ", end="")
            sp.pprint(f)
            print(" = ", end="")
            sp.pprint(limite)
            
        elif opcion == "3":
            limite_der = sp.limit(f, x, 0, '+')
            limite_izq = sp.limit(f, x, 0, '-')
            print(f"\nlim(x -> 0+) ", end="")
            sp.pprint(f)
            print(" = ", end="")
            sp.pprint(limite_der)
            print(f"\nlim(x -> 0-) ", end="")
            sp.pprint(f)
            print(" = ", end="")
            sp.pprint(limite_izq)
            
            if limite_der != limite_izq:
                print("\n[ATENCION] Los limites laterales son distintos - NO existe limite!")
            else:
                print(f"\nEl limite existe y vale: ", end="")
                sp.pprint(limite_der)
        
        else:
            print("Opcion invalida")
            
    except Exception as e:
        print(f"Error: {e}")

def demo():
    x = sp.symbols('x')
    header("DEMO: Casos de Limites")
    
    # Caso 1: limite basico
    f1 = (x**2 - 1) / (x - 1)
    l1 = sp.limit(f1, x, 1)
    print("\n1. Limite basico:")
    print("   lim(x->1) (x^2 - 1)/(x - 1)")
    print("   = ", end="")
    sp.pprint(l1)
    
    # Caso 2: limite notable
    f2 = sp.sin(x) / x
    l2 = sp.limit(f2, x, 0)
    print("\n2. Limite notable:")
    print("   lim(x->0) sin(x)/x")
    print("   = ", end="")
    sp.pprint(l2)
    
    # Caso 3: infinito
    f3 = 1 / x
    l3 = sp.limit(f3, x, oo)
    print("\n3. Limite infinito:")
    print("   lim(x->oo) 1/x")
    print("   = ", end="")
    sp.pprint(l3)
    
    # Caso 4: laterales
    f4 = 1 / x
    l4d = sp.limit(f4, x, 0, '+')
    l4i = sp.limit(f4, x, 0, '-')
    print("\n4. Limites laterales:")
    print("   lim(x->0+) 1/x = ", end="")
    sp.pprint(l4d)
    print("   lim(x->0-) 1/x = ", end="")
    sp.pprint(l4i)

def menu():
    while True:
        header("CALCULADORA DE LIMITES")
        print("  1. Calcular limite (interactivo)")
        print("  2. Ver demos")
        print("  0. Salir")
        
        opcion = input("\nSelecciona: ").strip()
        
        if opcion == "1":
            calcular_limite()
        elif opcion == "2":
            demo()
        elif opcion == "0":
            print("\nHasta luego!")
            break
        else:
            print("Opcion invalida")

if __name__ == "__main__":
    menu()