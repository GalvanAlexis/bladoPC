"""
Mini Proyecto 3: Calculadora de Integrales con SymPy
=========================================
Calcula integrales indefinidas y definidas, con verificacion
"""

import sympy as sp

def linea():
    print("=" * 50)

def header(titulo):
    linea()
    print(f"  {titulo}")
    linea()

def calcular_integral():
    x = sp.symbols('x')
    
    print("\nIngresa la funcion f(x):")
    print("Ejemplos: x**2, sin(x), exp(x), 1/x")
    func_str = input("f(x) = ")
    
    try:
        f = sp.sympify(func_str)
        print(f"\nFuncion: ", end="")
        sp.pprint(f)
        
        print("\nTipo de integral:")
        print("1. Indefinida (sin limites)")
        print("2. Definida (a -> b)")
        
        opcion = input("Opcion [1-2]: ").strip()
        
        if opcion == "1":
            integral = sp.integrate(f, x)
            print(f"\n∫ f(x) dx = ", end="")
            sp.pprint(integral)
            print("\n[+] C (constante de integracion)")
            
        elif opcion == "2":
            a_str = input("Limite inferior a: ").strip()
            b_str = input("Limite superior b: ").strip()
            try:
                a = sp.sympify(a_str)
                b = sp.sympify(b_str)
                
                integral = sp.integrate(f, (x, a, b))
                print(f"\n∫[{a}, {b}] f(x) dx = ", end="")
                sp.pprint(integral)
                
                # Verificacion: derivada del resultado
                print("\n[VERIFICACION]")
                print("Derivada de F(x) = ", end="")
                verif = sp.diff(integral, x)
                sp.pprint(verif)
                print("Debe ser igual a f(x)")
                
            except Exception as e:
                print(f"Error: {e}")
        else:
            print("Opcion invalida")
            
    except Exception as e:
        print(f"Error: {e}")

def integral_multiple():
    x = sp.symbols('x')
    
    print("\nIntegrales Multiples:")
    print("1. ∫∫ f(x,y) dx dy")
    opcion = input("Opcion [1]: ").strip()
    
    if opcion == "1":
        y = sp.symbols('y')
        func_str = input("f(x,y) = ").strip()
        
        try:
            f = sp.sympify(func_str)
            print(f"\nf(x,y) = ", end="")
            sp.pprint(f)
            
            # Integral en x
            ix = sp.integrate(f, x)
            # Integral en y
            iy = sp.integrate(ix, y)
            
            print(f"\n∫∫ f(x,y) dx dy = ", end="")
            sp.pprint(iy)
            
        except Exception as e:
            print(f"Error: {e}")

def verificar_teorema_fundamental():
    x = sp.symbols('x')
    
    print("\n[TEOREMA FUNDAMENTAL DEL CALCULO]")
    print("Si F'(x) = f(x), entonces ∫[a,b] f(x)dx = F(b) - F(a)")
    print()
    
    func_str = input("Ingresa f(x): ").strip()
    a_str = input("Limite inferior a: ").strip()
    b_str = input("Limite superior b: ").strip()
    
    try:
        f = sp.sympify(func_str)
        a = sp.sympify(a_str)
        b = sp.sympify(b_str)
        
        # Calcular integral
        F = sp.integrate(f, x)
        resultado = sp.integrate(f, (x, a, b))
        
        print(f"\nf(x) = ", end="")
        sp.pprint(f)
        
        print(f"\nF(x) = ∫f(x)dx = ", end="")
        sp.pprint(F)
        
        print(f"\n∫[{a}, {b}] f(x)dx = ", end="")
        sp.pprint(resultado)
        
        # Verificacion manual
        verif = F.subs(x, b) - F.subs(x, a)
        print(f"\nVerificacion: F({b}) - F({a}) = ", end="")
        sp.pprint(verif)
        
    except Exception as e:
        print(f"Error: {e}")

def demo():
    x = sp.symbols('x')
    header("DEMO: Casos de Integrales")
    
    print("\n1. Polinomica:")
    f1 = x**2
    print("   ∫ x^2 dx = ", end="")
    sp.pprint(sp.integrate(f1, x))
    
    print("\n2. Trigonometrica (sin x):")
    f2 = sp.sin(x)
    print("   ∫ sin(x) dx = ", end="")
    sp.pprint(sp.integrate(f2, x))
    
    print("\n3. Exponencial:")
    f3 = sp.exp(x)
    print("   ∫ e^x dx = ", end="")
    sp.pprint(sp.integrate(f3, x))
    
    print("\n4. Integral definida:")
    f4 = x**2
    print("   ∫[0,2] x^2 dx = ", end="")
    sp.pprint(sp.integrate(f4, (x, 0, 2)))
    
    print("\n5. Trigonometrica definida:")
    f5 = sp.sin(x)
    print("   ∫[0,π] sin(x) dx = ", end="")
    sp.pprint(sp.integrate(f5, (x, 0, sp.pi)))
    
    print("\n6. Por partes (demo):")
    # ∫ x*exp(x) dx = x*exp(x) - exp(x)
    f6 = x * sp.exp(x)
    print("   ∫ x*e^x dx = ", end="")
    sp.pprint(sp.integrate(f6, x))

def menu():
    while True:
        header("CALCULADORA DE INTEGRALES")
        print("  1. Calcular integral")
        print("  2. Integral multiple")
        print("  3. Teorema Fundamental")
        print("  4. Ver demos")
        print("  0. Salir")
        
        opcion = input("\nSelecciona: ").strip()
        
        if opcion == "1":
            calcular_integral()
        elif opcion == "2":
            integral_multiple()
        elif opcion == "3":
            verificar_teorema_fundamental()
        elif opcion == "4":
            demo()
        elif opcion == "0":
            print("\nHasta luego!")
            break
        else:
            print("Opcion invalida")

if __name__ == "__main__":
    menu()