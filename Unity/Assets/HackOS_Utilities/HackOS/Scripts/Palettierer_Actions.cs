using UnityEngine;
using System.Collections;

public class Palettierer_Actions : MonoBehaviour {

    [SerializeField]
    private GameObject Anchor;
    [SerializeField]
    private GameObject Item;
    private Vector3 start;
    private Vector3 euler;
    [SerializeField]
    private GameObject packageAnch;

    [SerializeField]
    private AudioSource audioSource_1;
    [SerializeField]
    private AudioSource audioSource_2;
    [SerializeField]
    private AudioSource audioSource_3;
    [SerializeField]
    private AudioSource audioSource_4;
    [SerializeField]
    private AudioSource audioSource_5;

    private AudioSource currentAS;
    void Start() {

        GetComponent<Animator>().SetBool("IsPlaying", true);
    }

    
    public void Rotate (int degrees)
    {
        Debug.Log("Rotate With Degrees " + degrees);
        gameObject.transform.parent.eulerAngles = new Vector3(0.0f, degrees, 0.0f);
    }

    public void SetAudio1() {

        currentAS = audioSource_1;
        currentAS.Play();
    }
    public void SetAudio2 (){ 

        currentAS = audioSource_2;
        currentAS.Play();
    }
    public void SetAudio3()
    {

        currentAS = audioSource_3;
        currentAS.Play();
    }
    public void SetAudio4()
    {

        currentAS = audioSource_4;
        currentAS.Play();
    }
    public void SetAudio5()
    {
        
        currentAS = audioSource_5;
        currentAS.Play();
        
    }

    public void Scale_1() {

        gameObject.transform.parent.gameObject.transform.localScale = new Vector3(0.1f, 0.1f, 0.1f);
    }

    public void Scale_2()
    {

        gameObject.transform.parent.gameObject.transform.localScale = new Vector3(1.0f, 1.0f, 1.0f);
    }


    public void PickUp() {

        Debug.Log("Pick up Item.");
        Item.transform.SetParent(Anchor.transform);
    }

    public void Place()
    {

        Debug.Log("Place Item.");
        Item.transform.SetParent(gameObject.transform);
    }

    public void Reset() {

        Debug.Log("Reset Item.");     
        Item.transform.position = packageAnch.transform.position;
        Item.transform.eulerAngles = packageAnch.transform.eulerAngles;

    }

    public void StartAnimation()
    {
        GetComponent<Animator>().enabled = true;
        if(currentAS != null)
            currentAS.Play();
    }

    public void StopAnimation()
    {
        GetComponent<Animator>().enabled = false;
        currentAS.Pause();
    }
}
