"""
Mini Proyecto 5: Simplificador de Expresiones con SymPy
=======================================
Expande, factoriza y simplifica expresiones algebraicas
"""

import sympy as sp

def linea():
    print("=" * 50)

def header(titulo):
    linea()
    print(f"  {titulo}")
    linea()

def simplificar():
    x = sp.symbols('x')
    y = sp.symbols('y')
    
    print("\nIngresa una expresion:")
    print("Ejemplos: (x**2 - 1)/(x - 1), sin(x)**2 + cos(x)**2")
    expr_str = input("Expresion: ")
    
    try:
        expr = sp.sympify(expr_str)
        print(f"\nOriginal: ", end="")
        sp.pprint(expr)
        
        print(f"\n[SIMPLIFICAR]")
        simple = sp.simplify(expr)
        print("simplify: ", end="")
        sp.pprint(simple)
        
    except Exception as e:
        print(f"Error: {e}")

def expandir():
    x = sp.symbols('x')
    y = sp.symbols('y')
    
    print("\nIngresa una expresionfactorizada:")
    print("Ejemplos: (x + 1)**3, (x - 1)*(x + 1)")
    expr_str = input("Expresion: ")
    
    try:
        expr = sp.sympify(expr_str)
        print(f"\nOriginal: ", end="")
        sp.pprint(expr)
        
        print(f"\n[EXPANDIR]")
        expanded = sp.expand(expr)
        print("expand: ", end="")
        sp.pprint(expanded)
        
    except Exception as e:
        print(f"Error: {e}")

def factorizar():
    x = sp.symbols('x')
    y = sp.symbols('y')
    
    print("\nIngresa una expresion expandida:")
    print("Ejemplos: x**2 + 2*x + 1, x**2 - 1")
    expr_str = input("Expresion: ")
    
    try:
        expr = sp.sympify(expr_str)
        print(f"\nOriginal: ", end="")
        sp.pprint(expr)
        
        print(f"\n[FACTORIZAR]")
        factored = sp.factor(expr)
        print("factor: ", end="")
        sp.pprint(factored)
        
    except Exception as e:
        print(f"Error: {e}")

def completo():
    x = sp.symbols('x')
    y = sp.symbols('y')
    n = sp.symbols('n', integer=True)
    
    print("\n[TRANSFORMACIONES COMPLETAS]")
    print("1. Expandir y factorizar")
    print("2. Simplificar expresiones trigonometricas")
    print("3. Rationalize (eliminar denominadores)")
    
    opcion = input("Opcion [1-3]: ").strip()
    
    if opcion == "1":
        expr_str = input("Expresion: ").strip()
        try:
            expr = sp.sympify(expr_str)
            print(f"\nOriginal: ", end="")
            sp.pprint(expr)
            
            print("\nExpandido: ", end="")
            sp.pprint(sp.expand(expr))
            
            print("\nFactorizado: ", end="")
            sp.pprint(sp.factor(expr))
        except Exception as e:
            print(f"Error: {e}")
    
    elif opcion == "2":
        print("\nExpresiones trigonometricas:")
        exprs = [
            "sin(x)**2 + cos(x)**2",
            "tan(x)*cos(x)",
            "sin(2*x)"
        ]
        for e in exprs:
            expr = sp.sympify(e)
            simplified = sp.simplify(expr)
            print(f"  {e}")
            print(f"  => ", end="")
            sp.pprint(simplified)
    
    elif opcion == "3":
        expr_str = input("Expresion con fracciones: ").strip()
        try:
            expr = sp.sympify(expr_str)
            print(f"\nOriginal: ", end="")
            sp.pprint(expr)
            
            print("\nRationalize: ", end="")
            sp.pprint(sp.rationalize(expr))
        except Exception as e:
            print(f"Error: {e}")

def identidad_trig():
    x = sp.symbols('x')
    
    header("IDENTIDADES TRIGONOMETRICAS")
    
    identidades = [
        ("sin(x)^2 + cos(x)^2", 1),
        ("tan(x)*cos(x)", sp.sin(x)),
        ("sin(2*x)", 2*sp.sin(x)*sp.cos(x)),
        ("cos(2*x)", sp.cos(x)**2 - sp.sin(x)**2),
        ("sin(x+y)", sp.sin(x)*sp.cos(y) + sp.cos(x)*sp.sin(y)),
    ]
    
    for expr_str, resultado in identidades:
        expr = sp.sympify(expr_str)
        simpl = sp.simplify(expr)
        
        print(f"\n{expr_str}")
        print(f"  = ", end="")
        sp.pprint(simpl)
        print(f"  (debe ser = ", end="")
        sp.pprint(resultado)
        print(")")

def sustitucion():
    x, y = sp.symbols('x y')
    
    print("\n[SUSTITUCION]")
    expr_str = input("Expresion original: ").strip()
    
    try:
        expr = sp.sympify(expr_str)
        print(f"\nOriginal: ", end="")
        sp.pprint(expr)
        
        print("\nSustituir variable:")
        var = input("Variable (x/y): ").strip()
        valor = input(f"Nuevo valor para {var}: ").strip()
        
        try:
            nuevo_valor = sp.sympify(valor)
            resultado = expr.subs(var, nuevo_valor)
            print(f"\nSustituyendo {var}={valor}: ", end="")
            sp.pprint(resultado)
        except Exception as e:
            print(f"Error: {e}")
            
    except Exception as e:
        print(f"Error: {e}")

def demo():
    header("DEMO: Transformaciones")
    
    print("\n1. (x+1)^2:")
    x = sp.symbols('x')
    expr = (x + 1)**2
    print("   Original: ", end="")
    sp.pprint(expr)
    print("   Expandido: ", end="")
    sp.pprint(sp.expand(expr))
    print("   Factorizado: ", end="")
    sp.pprint(sp.factor(expr))
    
    print("\n2. (x^2-1)/(x-1):")
    expr2 = (x**2 - 1)/(x - 1)
    print("   Original: ", end="")
    sp.pprint(expr2)
    print("   Simplificado: ", end="")
    sp.pprint(sp.simplify(expr2))
    
    print("\n3. sin(x)^2 + cos(x)^2:")
    expr3 = sp.sin(x)**2 + sp.cos(x)**2
    print("   Original: ", end="")
    sp.pprint(expr3)
    print("   Simplificado: ", end="")
    sp.pprint(sp.simplify(expr3))

def menu():
    while True:
        header("SIMPLIFICADOR DE EXPRESIONES")
        print("  1. Simplificar")
        print("  2. Expandir")
        print("  3. Factorizar")
        print("  4. Transformaciones completas")
        print("  5. Sustitucion")
        print("  6. Identidades trigonometricas")
        print("  7. Ver demos")
        print("  0. Salir")
        
        opcion = input("\nSelecciona: ").strip()
        
        if opcion == "1":
            simplificar()
        elif opcion == "2":
            expandir()
        elif opcion == "3":
            factorizar()
        elif opcion == "4":
            completo()
        elif opcion == "5":
            sustitucion()
        elif opcion == "6":
            identidad_trig()
        elif opcion == "7":
            demo()
        elif opcion == "0":
            print("\nHasta luego!")
            break
        else:
            print("Opcion invalida")

if __name__ == "__main__":
    menu()