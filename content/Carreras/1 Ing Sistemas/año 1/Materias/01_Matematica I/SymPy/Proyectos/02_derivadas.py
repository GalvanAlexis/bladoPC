"""
Mini Proyecto 2: Calculadora de Derivadas con SymPy
======================================
Calcula derivadas de funciones polinomicas, trigonometricas, exponenciales
"""

import sympy as sp

def linea():
    print("=" * 50)

def header(titulo):
    linea()
    print(f"  {titulo}")
    linea()

def calcular_derivada():
    x = sp.symbols('x')
    
    print("\nIngresa la funcion f(x):")
    print("Ejemplos: x**3 + 2*x**2, sin(x), exp(x), log(x)")
    func_str = input("f(x) = ")
    
    try:
        f = sp.sympify(func_str)
        print(f"\nFuncion original: ", end="")
        sp.pprint(f)
        
        print("\nQue derivada quieres?")
        print("1. Primera derivada f'(x)")
        print("2. Segunda derivada f''(x)")
        print("3. Tercera derivada f'''(x)")
        print("4. Derivada n-esima")
        
        opcion = input("Opcion [1-4]: ").strip()
        
        if opcion == "1":
            df = sp.diff(f, x)
            print(f"\nf'(x) = ", end="")
            sp.pprint(df)
            
        elif opcion == "2":
            d2f = sp.diff(f, x, 2)
            print(f"\nf''(x) = ", end="")
            sp.pprint(d2f)
            
        elif opcion == "3":
            d3f = sp.diff(f, x, 3)
            print(f"\nf'''(x) = ", end="")
            sp.pprint(d3f)
            
        elif opcion == "4":
            try:
                n = int(input("Orden n: "))
                dnf = sp.diff(f, x, n)
                print(f"\nf^({n})(x) = ", end="")
                sp.pprint(dnf)
            except ValueError:
                print("Error: n debe ser entero")
        else:
            print("Opcion invalida")
            
        # Evaluar en un punto
        print("\nEvaluar en un punto? (s/n): ", end="")
        if input().strip().lower() == 's':
            try:
                a = sp.sympify(input("Punto a: ").strip())
                val = sp.diff(f, x, 1).subs(x, a)
                print(f"f'({a}) = ", end="")
                sp.pprint(val)
            except:
                print("Error al evaluar")
                
    except Exception as e:
        print(f"Error: {e}")

def derivada_parcial():
    x, y = sp.symbols('x y')
    
    print("\nDerivadas Parciales:")
    print("1. df/dx")
    print("2. df/dy")
    print("3. d2f/dx2")
    
    opcion = input("Opcion [1-3]: ").strip()
    func_str = input("f(x,y) = ").strip()
    
    try:
        f = sp.sympify(func_str)
        print(f"\nf(x,y) = ", end="")
        sp.pprint(f)
        
        if opcion == "1":
            dfdx = sp.diff(f, x)
            print(f"\ndf/dx = ", end="")
            sp.pprint(dfdx)
        elif opcion == "2":
            dfdy = sp.diff(f, y)
            print(f"\ndf/dy = ", end="")
            sp.pprint(dfdy)
        elif opcion == "3":
            d2fdx2 = sp.diff(f, x, 2)
            print(f"\nd2f/dx2 = ", end="")
            sp.pprint(d2fdx2)
    except Exception as e:
        print(f"Error: {e}")

def demo():
    x = sp.symbols('x')
    header("DEMO: Casos de Derivadas")
    
    print("\n1. Funcion polinomica:")
    f1 = x**3 + 2*x**2 + x + 1
    print("   f(x) = x^3 + 2x^2 + x + 1")
    print("   f'(x) = ", end="")
    sp.pprint(sp.diff(f1, x))
    
    print("\n2. Funcion trigonometrica:")
    f2 = sp.sin(x)
    print("   f(x) = sin(x)")
    print("   f'(x) = ", end="")
    sp.pprint(sp.diff(f2, x))
    
    print("\n3. Funcion exponencial:")
    f3 = sp.exp(x)
    print("   f(x) = e^x")
    print("   f'(x) = ", end="")
    sp.pprint(sp.diff(f3, x))
    
    print("\n4. Funcion logaritmica:")
    f4 = sp.log(x)
    print("   f(x) = ln(x)")
    print("   f'(x) = ", end="")
    sp.pprint(sp.diff(f4, x))
    
    print("\n5. Regla del producto:")
    f5 = x**2 * sp.sin(x)
    print("   f(x) = x^2 * sin(x)")
    print("   f'(x) = ", end="")
    sp.pprint(sp.diff(f5, x))
    
    print("\n6. Regla de la cadena:")
    f6 = sp.sin(x**2)
    print("   f(x) = sin(x^2)")
    print("   f'(x) = ", end="")
    sp.pprint(sp.diff(f6, x))

def menu():
    while True:
        header("CALCULADORA DE DERIVADAS")
        print("  1. Calcular derivada (una variable)")
        print("  2. Derivadas parciales (2 variables)")
        print("  3. Ver demos")
        print("  0. Salir")
        
        opcion = input("\nSelecciona: ").strip()
        
        if opcion == "1":
            calcular_derivada()
        elif opcion == "2":
            derivada_parcial()
        elif opcion == "3":
            demo()
        elif opcion == "0":
            print("\nHasta luego!")
            break
        else:
            print("Opcion invalida")

if __name__ == "__main__":
    menu()