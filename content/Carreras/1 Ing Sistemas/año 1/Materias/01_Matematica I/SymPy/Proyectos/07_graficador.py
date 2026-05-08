"""
Mini Proyecto 7: Graficador de Funciones con SymPy
=============================================
Grafica funciones matematicas con matplotlib
"""

import sympy as sp
import numpy as np
import matplotlib.pyplot as plt
from sympy import oo

def linea():
    print("=" * 50)

def header(titulo):
    linea()
    print(f"  {titulo}")
    linea()

def graficar_funcion():
    x = sp.symbols('x')
    
    print("\n[GRAFICAR FUNCION f(x)]")
    print("Ejemplos: x**2, sin(x), exp(x), log(x)")
    func_str = input("f(x) = ").strip()
    
    try:
        f = sp.sympify(func_str)
        
        print("\nRango de x:")
        xmin = float(input("x min: ").strip())
        xmax = float(input("x max: ").strip())
        
        # Convertir a funcion numerica
        f_lambdified = sp.lambdify(x, f, modules=['numpy'])
        
        # Generar puntos
        x_vals = np.linspace(xmin, xmax, 500)
        
        # Filtrar valores problematicos
        try:
            y_vals = f_lambdified(x_vals)
            y_vals = np.nan_to_num(y_vals, nan=0.0, posinf=0.0, neginf=0.0)
        except:
            y_vals = np.zeros_like(x_vals)
        
        # Graficar
        plt.figure(figsize=(10, 6))
        plt.plot(x_vals, y_vals, 'b-', linewidth=2, label=f'f(x) = {func_str}')
        plt.axhline(0, color='k', linewidth=0.5)
        plt.axvline(0, color='k', linewidth=0.5)
        plt.grid(True, alpha=0.3)
        plt.xlabel('x')
        plt.ylabel('f(x)')
        plt.title(f'Grafica de f(x) = {func_str}')
        plt.legend()
        plt.tight_layout()
        plt.show()
        
    except Exception as e:
        print(f"Error: {e}")

def graficar_multiples():
    x = sp.symbols('x')
    
    print("\n[GRAFICAR MULTIPLES FUNCIONES]")
    funciones = []
    
    while True:
        f_str = input("f(x) (Enter para terminar): ").strip()
        if not f_str:
            break
        try:
            f = sp.sympify(f_str)
            funciones.append((f_str, f))
        except:
            print("Error: funcion invalida")
    
    if not funciones:
        print("No hay funciones")
        return
    
    print("\nRango:")
    xmin = float(input("x min: ").strip())
    xmax = float(input("x max: ").strip())
    
    # Graficar
    plt.figure(figsize=(10, 6))
    x_vals = np.linspace(xmin, xmax, 500)
    colores = ['b', 'r', 'g', 'm', 'c', 'y']
    
    for i, (f_str, f) in enumerate(funciones):
        try:
            f_num = sp.lambdify(x, f, modules=['numpy'])
            y_vals = f_num(x_vals)
            y_vals = np.nan_to_num(y_vals, nan=0.0, posinf=0.0, neginf=0.0)
            plt.plot(x_vals, y_vals, colores[i % len(colores)], linewidth=2, label=f_str)
        except:
            pass
    
    plt.axhline(0, color='k', linewidth=0.5)
    plt.axvline(0, color='k', linewidth=0.5)
    plt.grid(True, alpha=0.3)
    plt.xlabel('x')
    plt.ylabel('f(x)')
    plt.title('Graficas multiples')
    plt.legend()
    plt.tight_layout()
    plt.show()

def graficar_parametrica():
    t = sp.symbols('t')
    
    print("\n[GRAFICA PARAMETRICA]")
    x_str = input("x(t) = ").strip()
    y_str = input("y(t) = ").strip()
    
    try:
        x = sp.sympify(x_str)
        y = sp.sympify(y_str)
        
        tmin = float(input("t min: ").strip())
        tmax = float(input("t max: ").strip())
        
        # Funciones numericas
        x_num = sp.lambdify(t, x, modules=['numpy'])
        y_num = sp.lambdify(t, y, modules=['numpy'])
        
        t_vals = np.linspace(tmin, tmax, 500)
        x_vals = x_num(t_vals)
        y_vals = y_num(t_vals)
        
        plt.figure(figsize=(10, 6))
        plt.plot(x_vals, y_vals, 'b-', linewidth=2)
        plt.axis('equal')
        plt.grid(True, alpha=0.3)
        plt.xlabel('x(t)')
        plt.ylabel('y(t)')
        plt.title(f'Curva parametrica: x={x_str}, y={y_str}')
        plt.tight_layout()
        plt.show()
        
    except Exception as e:
        print(f"Error: {e}")

def graficar_polar():
    theta = sp.symbols('theta', positive=True)
    
    print("\n[GRAFICA POLAR r(theta)]")
    r_str = input("r(theta) = ").strip()
    
    try:
        r = sp.sympify(r_str)
        
        tmin = float(input("theta min (0): ").strip() or "0")
        tmax = float(input("theta max (2pi): ").strip() or "2*3.14159")
        
        r_num = sp.lambdify(theta, r, modules=['numpy'])
        theta_vals = np.linspace(float(tmin), float(tmax), 500)
        r_vals = r_num(theta_vals)
        
        # Convertir a cartesiana
        x_vals = r_vals * np.cos(theta_vals)
        y_vals = r_vals * np.sin(theta_vals)
        
        plt.figure(figsize=(10, 6))
        plt.plot(x_vals, y_vals, 'g-', linewidth=2)
        plt.axis('equal')
        plt.grid(True, alpha=0.3)
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title(f'Curva polar: r = {r_str}')
        plt.tight_layout()
        plt.show()
        
    except Exception as e:
        print(f"Error: {e}")

def analizar_funcion():
    x = sp.symbols('x')
    
    print("\n[ANALISIS COMPLETO DE f(x)]")
    func_str = input("f(x) = ").strip()
    
    try:
        f = sp.sympify(func_str)
        
        print(f"\nf(x) = ", end="")
        sp.pprint(f)
        
        # Dominio (evaluable)
        print("\n[DOMINIO]")
        print("SymPy: funcion definida para x reales")
        
        # Limites
        print("\n[LIMITES]")
        lims = [(-oo, 'x -> -oo'), (0, 'x -> 0+'), (oo, 'x -> oo')]
        for val, desc in lims:
            try:
                l = sp.limit(f, x, val)
                print(f"  {desc} = ", end="")
                sp.pprint(l)
            except:
                pass
        
        # Derivada ( pendientes)
        print("\n[DERIVADA]")
        df = sp.diff(f, x)
        print(f"  f'(x) = ", end="")
        sp.pprint(df)
        
        # Puntos criticos
        print("\n[PUNTOS CRITICOS]")
        criticos = sp.solve(df, x)
        print(f"  f'(x) = 0 en x = ", end="")
        sp.pprint(criticos)
        
        # Raices
        print("\n[RAICES]")
        raices = sp.solve(f, x)
        print(f"  f(x) = 0 en x = ", end="")
        sp.pprint(raices)
        
        # Graficar
        print("\n[ grafICA]")
        if input("Graficar? (s/n): ").strip().lower() == 's':
            f_num = sp.lambdify(x, f, modules=['numpy'])
            x_vals = np.linspace(-10, 10, 500)
            y_vals = f_num(x_vals)
            y_vals = np.nan_to_num(y_vals, nan=0.0, posinf=0.0, neginf=0.0)
            
            plt.figure(figsize=(10, 6))
            plt.plot(x_vals, y_vals, 'b-', linewidth=2)
            plt.axhline(0, color='k', linewidth=0.5)
            plt.axvline(0, color='k', linewidth=0.5)
            plt.grid(True, alpha=0.3)
            plt.xlabel('x')
            plt.ylabel('f(x)')
            plt.title(f'f(x) = {func_str}')
            plt.tight_layout()
            plt.show()
        
    except Exception as e:
        print(f"Error: {e}")

def demo():
    header("DEMO: Graficos")
    
    x = sp.symbols('x')
    
    # Funcion cuadratica
    print("\n1. Funcion cuadratica: x^2")
    f = x**2
    f_num = sp.lambdify(x, f, modules=['numpy'])
    x_vals = np.linspace(-5, 5, 200)
    y_vals = f_num(x_vals)
    
    plt.figure()
    plt.plot(x_vals, y_vals, 'b-', linewidth=2)
    plt.title('f(x) = x^2')
    plt.grid(True, alpha=0.3)
    plt.show()
    
    # Funcion trigonometrica
    print("\n2. Funcion trigonometrica: sin(x)")
    f = sp.sin(x)
    f_num = sp.lambdify(x, f, modules=['numpy'])
    x_vals = np.linspace(-2*sp.pi, 2*sp.pi, 200)
    y_vals = f_num(x_vals)
    
    plt.figure()
    plt.plot(x_vals, y_vals, 'r-', linewidth=2)
    plt.title('f(x) = sin(x)')
    plt.grid(True, alpha=0.3)
    plt.show()

def menu():
    while True:
        header("GRAFICADOR DE FUNCIONES")
        print("  1. Graficar una funcion")
        print("  2. Multiples funciones")
        print("  3. Grafica parametrica")
        print("  4. Grafica polar")
        print("  5. Analisis completo")
        print("  6. Ver demos")
        print("  0. Salir")
        
        opcion = input("\nSelecciona: ").strip()
        
        if opcion == "1":
            graficar_funcion()
        elif opcion == "2":
            graficar_multiples()
        elif opcion == "3":
            graficar_parametrica()
        elif opcion == "4":
            graficar_polar()
        elif opcion == "5":
            analizar_funcion()
        elif opcion == "6":
            demo()
        elif opcion == "0":
            print("\nHasta luego!")
            break
        else:
            print("Opcion invalida")

if __name__ == "__main__":
    menu()